import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MENU } from '../data/initialMenu';
import { INITIAL_ORDERS } from '../data/initialOrders';

const CanteenContext = createContext();

export const useCanteen = () => {
  const context = useContext(CanteenContext);
  if (!context) {
    throw new Error('useCanteen must be used within a CanteenProvider');
  }
  return context;
};

const MENU_STORAGE_KEY = 'campusbite_menu_v1';
const ORDERS_STORAGE_KEY = 'campusbite_orders_v1';
const CART_STORAGE_KEY = 'campusbite_cart_v1';
const LAST_TOKEN_KEY = 'campusbite_token_counter_v1';

export const CanteenProvider = ({ children }) => {
  // 1. Menu State (synced with localStorage)
  const [menu, setMenu] = useState(() => {
    try {
      const saved = localStorage.getItem(MENU_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read menu from localStorage, using initial sample menu.', e);
    }
    return INITIAL_MENU;
  });

  // 2. Orders State (synced with localStorage)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read orders from localStorage, using initial sample orders.', e);
    }
    return INITIAL_ORDERS;
  });

  // 3. Cart State (synced with localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Could not read cart from localStorage, using empty cart.', e);
    }
    return [];
  });

  // Navigation & Role State
  const [userRole, setUserRole] = useState('student'); // 'student' | 'admin'
  const [studentTab, setStudentTab] = useState('menu'); // 'menu' | 'track' | 'history' | 'about'
  const [adminTab, setAdminTab] = useState('orders'); // 'orders' | 'menu-mgmt' | 'analytics'
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active tracking token (e.g. for track order page)
  const [activeToken, setActiveToken] = useState('CN-101');
  const [justPlacedOrder, setJustPlacedOrder] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
    } catch (e) {
      console.error('Failed to save menu to localStorage', e);
    }
  }, [menu]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Cart Operations
  const addToCart = (item) => {
    if (!item.isAvailable) {
      showToast(`${item.name} is currently out of stock.`, 'warning');
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.id === item.id);
      if (existing) {
        showToast(`Increased ${item.name} quantity to ${existing.quantity + 1}`, 'info');
        return prevCart.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        showToast(`Added ${item.name} to cart!`, 'success');
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (itemId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (itemId) => {
    const item = cart.find((ci) => ci.id === itemId);
    setCart((prevCart) => prevCart.filter((ci) => ci.id !== itemId));
    if (item) {
      showToast(`Removed ${item.name} from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Generate Unique Token (e.g., CN-106)
  const getNextToken = () => {
    let nextNum = 106;
    try {
      const savedNum = localStorage.getItem(LAST_TOKEN_KEY);
      if (savedNum) {
        nextNum = parseInt(savedNum, 10) + 1;
      } else if (orders.length > 0) {
        const nums = orders
          .map((o) => parseInt(o.token.replace('CN-', ''), 10))
          .filter((n) => !isNaN(n));
        if (nums.length > 0) {
          nextNum = Math.max(...nums) + 1;
        }
      }
      localStorage.setItem(LAST_TOKEN_KEY, nextNum.toString());
    } catch {
      nextNum = Math.floor(100 + Math.random() * 900);
    }
    return `CN-${nextNum}`;
  };

  // Place Order
  const placeOrder = (orderInput) => {
    if (cart.length === 0) {
      showToast('Cannot place an empty order!', 'warning');
      return null;
    }

    const token = getNextToken();
    const maxPrepTime = Math.max(...cart.map((c) => c.prepTime || 7), 5);

    const newOrder = {
      id: `ord-${Date.now()}`,
      token,
      customerName: orderInput.name.trim(),
      studentId: orderInput.studentId.trim().toUpperCase(),
      phone: orderInput.phone.trim(),
      pickupSlot: orderInput.pickupSlot,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: cartTotal,
      status: 'Pending',
      paymentMode: orderInput.paymentMode || 'Campus Pay (Demo)',
      timestamp: new Date().toISOString(),
      estimatedMinutes: maxPrepTime,
      notes: orderInput.notes || ''
    };

    // Update menu order counts for demand analytics
    setMenu((prevMenu) =>
      prevMenu.map((m) => {
        const inCart = cart.find((c) => c.id === m.id);
        if (inCart) {
          return {
            ...m,
            orderCount: (m.orderCount || 0) + inCart.quantity,
            dailySold: (m.dailySold || 0) + inCart.quantity
          };
        }
        return m;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);
    setActiveToken(token);
    setJustPlacedOrder(newOrder);
    setStudentTab('track');
    showToast(`Order Placed! Your Token is ${token}`, 'success');
    return newOrder;
  };

  // Admin Order Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    showToast(`Order status updated to "${newStatus}"`, 'info');
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      )
    );
    showToast('Order was cancelled', 'warning');
  };

  // Admin Menu Management Actions
  const addMenuItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: `m-${Date.now()}`,
      orderCount: 0,
      dailyPrepared: Number(newItem.dailyPrepared) || 40,
      dailySold: 0,
      price: Number(newItem.price),
      prepTime: Number(newItem.prepTime) || 8,
      rating: 4.8
    };
    setMenu((prev) => [itemWithId, ...prev]);
    showToast(`Added "${newItem.name}" to menu!`, 'success');
  };

  const updateMenuItem = (updatedItem) => {
    setMenu((prev) =>
      prev.map((item) =>
        item.id === updatedItem.id
          ? {
              ...item,
              ...updatedItem,
              price: Number(updatedItem.price),
              prepTime: Number(updatedItem.prepTime),
              dailyPrepared: Number(updatedItem.dailyPrepared)
            }
          : item
      )
    );
    showToast(`Updated "${updatedItem.name}"`, 'success');
  };

  const deleteMenuItem = (itemId) => {
    const target = menu.find((m) => m.id === itemId);
    setMenu((prev) => prev.filter((item) => item.id !== itemId));
    showToast(`Deleted "${target ? target.name : 'Item'}" from menu`, 'info');
  };

  const toggleAvailability = (itemId) => {
    setMenu((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextState = !item.isAvailable;
          showToast(
            `${item.name} is now ${nextState ? 'Available' : 'Out of Stock'}`,
            nextState ? 'success' : 'warning'
          );
          return { ...item, isAvailable: nextState };
        }
        return item;
      })
    );
  };

  // Reset to default sample data
  const resetAllData = () => {
    localStorage.removeItem(MENU_STORAGE_KEY);
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(LAST_TOKEN_KEY);
    setMenu(INITIAL_MENU);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    setActiveToken('CN-101');
    setJustPlacedOrder(null);
    showToast('Reset data to initial factory sample dataset!', 'info');
  };

  return (
    <CanteenContext.Provider
      value={{
        menu,
        orders,
        cart,
        cartTotal,
        cartItemCount,
        userRole,
        setUserRole,
        studentTab,
        setStudentTab,
        adminTab,
        setAdminTab,
        isCartOpen,
        setIsCartOpen,
        activeToken,
        setActiveToken,
        justPlacedOrder,
        setJustPlacedOrder,
        toast,
        showToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        cancelOrder,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleAvailability,
        resetAllData
      }}
    >
      {children}
    </CanteenContext.Provider>
  );
};
