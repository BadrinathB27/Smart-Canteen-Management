import React from 'react';
import { CanteenProvider, useCanteen } from './context/CanteenContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { CartDrawer } from './pages/student/CartDrawer';
import { HeroBanner } from './pages/student/HeroBanner';
import { MenuSection } from './pages/student/MenuSection';
import { OrderTracking } from './pages/student/OrderTracking';
import { OrderHistory } from './pages/student/OrderHistory';
import { AboutSection } from './pages/student/AboutSection';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import './styles/App.css';

const MainAppContent = () => {
  const { userRole, studentTab, setStudentTab } = useCanteen();

  const handleScrollToMenu = () => {
    setStudentTab('menu');
    const elem = document.getElementById('menu-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Area */}
      <main className="main-content">
        {userRole === 'student' ? (
          <>
            {studentTab === 'menu' && (
              <>
                <HeroBanner onExploreClick={handleScrollToMenu} />
                <MenuSection />
              </>
            )}
            {studentTab === 'track' && <OrderTracking />}
            {studentTab === 'history' && <OrderHistory />}
            {studentTab === 'about' && <AboutSection />}
          </>
        ) : (
          /* Canteen Admin Staff Dashboard */
          <AdminDashboard />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Global Toast Notification */}
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CanteenProvider>
      <MainAppContent />
    </CanteenProvider>
  );
}
