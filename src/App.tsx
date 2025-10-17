import React from 'react';
import { RouterProvider, useRouter } from './components/AppRouter';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { currentRoute, isAuthenticated, isGuest } = useRouter();

  // If not authenticated and not guest, show login page
  if (!isAuthenticated && !isGuest) {
    if (currentRoute === 'register') {
      return <RegisterPage />;
    }
    return <LoginPage />;
  }

  // Render based on current route
  switch (currentRoute) {
    case 'home':
      return <HomePage />;
    case 'product':
      return <ProductPage />;
    case 'notifications':
      // Guests can't access notifications, redirect to register
      if (isGuest) {
        return <RegisterPage />;
      }
      return <NotificationsPage />;
    case 'profile':
      // Guests can't access profile, redirect to register
      if (isGuest) {
        return <RegisterPage />;
      }
      return <ProfilePage />;
    case 'orders':
      // Guests can't access orders, redirect to register
      if (isGuest) {
        return <RegisterPage />;
      }
      return <OrderHistoryPage />;
    case 'register':
      return <RegisterPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen bg-background">
        <AppContent />
        <Toaster 
          position="top-right"
          expand={false}
          richColors
        />
      </div>
    </RouterProvider>
  );
}