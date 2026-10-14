import React, { useState } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Clock, 
  CreditCard, 
  User, 
  Phone, 
  Hash, 
  Sparkles,
  Info
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    cartTotal,
    cartItemCount,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    placeOrder
  } = useCanteen();

  // Form states with realistic default student demo info
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    studentId: 'CS-2024-042',
    phone: '9876543210',
    pickupSlot: 'Immediate (~8-10 mins)',
    paymentMode: 'Campus Pay (Demo)',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter student name';
    }
    if (!formData.studentId.trim()) {
      errs.studentId = 'Please enter college roll/ID number';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter a phone number';
    } else if (!/^\d{10}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    return errs;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder(formData);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping Cart Drawer"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <ShoppingBag size={20} color="#f97316" />
            <span>Your Canteen Tray</span>
            <span
              style={{
                fontSize: '0.75rem',
                background: '#ffedd5',
                color: '#c2410c',
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
                fontWeight: 700
              }}
            >
              {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            className="close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <ShoppingBag size={34} />
              </div>
              <h4 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Your tray is empty!</h4>
              <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
                Looks like you haven't picked any delicious food yet. Check out today's hot specials!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: '#f97316',
                  color: 'white',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginTop: '0.5rem'
                }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                    Selected Items
                  </span>
                  <button
                    onClick={clearCart}
                    style={{
                      background: 'transparent',
                      color: '#94a3b8',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                  >
                    <Trash2 size={13} /> Clear all
                  </button>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-thumb"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-unit-price">
                        ₹{item.price} each • {item.isVeg ? '🌱 Veg' : '🍗 Non-Veg'}
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-item-subtotal">₹{item.price * item.quantity}</div>
                      <div className="stepper-controls" style={{ transform: 'scale(0.85)', transformOrigin: 'right center' }}>
                        <button
                          className="stepper-btn"
                          onClick={() => updateCartQuantity(item.id, -1)}
                          aria-label={`Decrease ${item.name}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="stepper-qty">{item.quantity}</span>
                        <button
                          className="stepper-btn"
                          onClick={() => updateCartQuantity(item.id, 1)}
                          aria-label={`Increase ${item.name}`}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Student Order Placement Form */}
              <form id="checkout-form" onSubmit={handleSubmitOrder} className="checkout-form-card">
                <div className="checkout-section-title">
                  <User size={16} color="#f97316" />
                  <span>Student Pickup Details</span>
                </div>

                {/* Name */}
                <div className="form-field">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter student name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                {/* Roll Number & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div className="form-field">
                    <label className="form-label">College ID / Roll No *</label>
                    <input
                      type="text"
                      placeholder="e.g. CS-2024-042"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    />
                    {errors.studentId && <span className="form-error">{errors.studentId}</span>}
                  </div>

                  <div className="form-field">
                    <label className="form-label">Mobile (10 digits) *</label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>

                {/* Pickup Slot */}
                <div className="form-field">
                  <label className="form-label">Select Pickup Window *</label>
                  <select
                    value={formData.pickupSlot}
                    onChange={(e) => setFormData({ ...formData, pickupSlot: e.target.value })}
                  >
                    <option value="Immediate (~8-10 mins)">Immediate (~8-10 mins)</option>
                    <option value="12:15 PM - Break Slot 1">12:15 PM - Break Slot 1</option>
                    <option value="12:45 PM - Break Slot 2">12:45 PM - Break Slot 2</option>
                    <option value="1:15 PM - Lunch Break">1:15 PM - Lunch Break</option>
                    <option value="4:30 PM - Evening Break">4:30 PM - Evening Break</option>
                  </select>
                </div>

                {/* Payment Mode Selection */}
                <div className="form-field">
                  <label className="form-label">Payment Mode (Demo Checkout)</label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                  >
                    <option value="Campus Pay (Demo)">Campus Pay Card (Demo)</option>
                    <option value="UPI QR Code (Demo)">UPI / Google Pay (Demo)</option>
                    <option value="Cash at Counter (Demo)">Pay Cash at Counter (Demo)</option>
                  </select>
                </div>

                {/* Special Instructions */}
                <div className="form-field">
                  <label className="form-label">Kitchen Notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Extra spicy, less oil, pack in foil"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                {/* Demo Notice */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#1d4ed8',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.74rem'
                  }}
                >
                  <Info size={14} flexShrink={0} />
                  <span>Demo Mode: No actual money is debited. Generates a live digital token for testing.</span>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Footer with Price breakdown and Checkout Button */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line">
              <span>Items Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="cart-summary-line" style={{ color: '#059669' }}>
              <span>Campus Student Subsidy</span>
              <span>-₹0.00</span>
            </div>
            <div className="cart-summary-line">
              <span>Taxes (GST Inclusive)</span>
              <span>₹0.00</span>
            </div>
            <div className="cart-summary-total">
              <span>Grand Total</span>
              <span style={{ color: '#f97316' }}>₹{cartTotal}</span>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="checkout-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Generating Token...</span>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Confirm Order & Get Token • ₹{cartTotal}</span>
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
