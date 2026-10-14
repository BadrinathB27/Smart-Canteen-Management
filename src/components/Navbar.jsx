import React, { useState } from 'react';
import { useCanteen } from '../context/CanteenContext';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  ClipboardList, 
  History, 
  BarChart3, 
  Settings2, 
  Info, 
  Menu as MenuIcon, 
  X,
  ChefHat,
  GraduationCap
} from 'lucide-react';

export const Navbar = () => {
  const {
    userRole,
    setUserRole,
    studentTab,
    setStudentTab,
    adminTab,
    setAdminTab,
    cartItemCount,
    cartTotal,
    setIsCartOpen,
    orders
  } = useCanteen();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active pending / preparing orders count for badge
  const activeOrdersCount = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Preparing'
  ).length;

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div
          className="brand-wrapper"
          onClick={() => {
            if (userRole === 'student') setStudentTab('menu');
            if (userRole === 'admin') setAdminTab('orders');
          }}
          title="CampusBite Smart Canteen"
        >
          <div className="brand-logo-icon">
            <UtensilsCrossed size={22} />
          </div>
          <div className="brand-info">
            <h1>
              CampusBite
              <span className="brand-badge">Smart Canteen</span>
            </h1>
            <p>Skip The Queue • Eat Fresh</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop">
          {userRole === 'student' ? (
            <>
              <button
                className={`nav-link-btn ${studentTab === 'menu' ? 'active' : ''}`}
                onClick={() => setStudentTab('menu')}
              >
                <UtensilsCrossed size={16} />
                Food Menu
              </button>
              <button
                className={`nav-link-btn ${studentTab === 'track' ? 'active' : ''}`}
                onClick={() => setStudentTab('track')}
              >
                <ClipboardList size={16} />
                Track Order
                {activeOrdersCount > 0 && (
                  <span className="nav-counter-pill">{activeOrdersCount}</span>
                )}
              </button>
              <button
                className={`nav-link-btn ${studentTab === 'history' ? 'active' : ''}`}
                onClick={() => setStudentTab('history')}
              >
                <History size={16} />
                My Orders
              </button>
              <button
                className={`nav-link-btn ${studentTab === 'about' ? 'active' : ''}`}
                onClick={() => setStudentTab('about')}
              >
                <Info size={16} />
                About System
              </button>
            </>
          ) : (
            <>
              <button
                className={`nav-link-btn ${adminTab === 'orders' ? 'active' : ''}`}
                onClick={() => setAdminTab('orders')}
              >
                <ClipboardList size={16} />
                Kitchen Queue
                {activeOrdersCount > 0 && (
                  <span className="nav-counter-pill">{activeOrdersCount}</span>
                )}
              </button>
              <button
                className={`nav-link-btn ${adminTab === 'menu-mgmt' ? 'active' : ''}`}
                onClick={() => setAdminTab('menu-mgmt')}
              >
                <Settings2 size={16} />
                Menu Manager
              </button>
              <button
                className={`nav-link-btn ${adminTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setAdminTab('analytics')}
              >
                <BarChart3 size={16} />
                Waste & Demand Analytics
              </button>
            </>
          )}
        </nav>

        {/* Right Side Actions: Role Switcher & Cart */}
        <div className="nav-actions">
          {/* Role Switcher */}
          <div className="role-switch-container" title="Switch between Student & Canteen Staff Views">
            <button
              className={`role-btn ${userRole === 'student' ? 'active' : ''}`}
              onClick={() => setUserRole('student')}
            >
              <GraduationCap size={15} />
              Student
            </button>
            <button
              className={`role-btn ${userRole === 'admin' ? 'active admin' : ''}`}
              onClick={() => setUserRole('admin')}
            >
              <ChefHat size={15} />
              Staff <span className="demo-tag">DEMO</span>
            </button>
          </div>

          {/* Cart Button (Always accessible for students, or quick access) */}
          {userRole === 'student' && (
            <button
              className="cart-nav-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag size={18} />
              <span className="cart-badge">{cartItemCount}</span>
              {cartTotal > 0 && <span>₹{cartTotal}</span>}
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu open animate-fade-in">
          {userRole === 'student' ? (
            <>
              <button
                className={`nav-link-btn ${studentTab === 'menu' ? 'active' : ''}`}
                onClick={() => {
                  setStudentTab('menu');
                  setMobileMenuOpen(false);
                }}
              >
                <UtensilsCrossed size={16} /> Food Menu
              </button>
              <button
                className={`nav-link-btn ${studentTab === 'track' ? 'active' : ''}`}
                onClick={() => {
                  setStudentTab('track');
                  setMobileMenuOpen(false);
                }}
              >
                <ClipboardList size={16} /> Track Order ({activeOrdersCount})
              </button>
              <button
                className={`nav-link-btn ${studentTab === 'history' ? 'active' : ''}`}
                onClick={() => {
                  setStudentTab('history');
                  setMobileMenuOpen(false);
                }}
              >
                <History size={16} /> My Orders
              </button>
              <button
                className={`nav-link-btn ${studentTab === 'about' ? 'active' : ''}`}
                onClick={() => {
                  setStudentTab('about');
                  setMobileMenuOpen(false);
                }}
              >
                <Info size={16} /> About System
              </button>
            </>
          ) : (
            <>
              <button
                className={`nav-link-btn ${adminTab === 'orders' ? 'active' : ''}`}
                onClick={() => {
                  setAdminTab('orders');
                  setMobileMenuOpen(false);
                }}
              >
                <ClipboardList size={16} /> Kitchen Queue ({activeOrdersCount})
              </button>
              <button
                className={`nav-link-btn ${adminTab === 'menu-mgmt' ? 'active' : ''}`}
                onClick={() => {
                  setAdminTab('menu-mgmt');
                  setMobileMenuOpen(false);
                }}
              >
                <Settings2 size={16} /> Menu Manager
              </button>
              <button
                className={`nav-link-btn ${adminTab === 'analytics' ? 'active' : ''}`}
                onClick={() => {
                  setAdminTab('analytics');
                  setMobileMenuOpen(false);
                }}
              >
                <BarChart3 size={16} /> Waste & Demand Analytics
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
