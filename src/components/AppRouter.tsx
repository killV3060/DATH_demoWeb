import React, { createContext, useContext, useState, ReactNode } from 'react';

// Route types
export type Route = 'login' | 'register' | 'home' | 'product' | 'notifications' | 'profile' | 'orders';

interface RouterContextType {
  currentRoute: Route;
  navigate: (route: Route, params?: any) => void;
  params: any;
  isAuthenticated: boolean;
  isGuest: boolean;
  setAuthenticated: (value: boolean) => void;
  setGuest: (value: boolean) => void;
  user: any;
  setUser: (user: any) => void;
  showRegisterModal: boolean;
  setShowRegisterModal: (value: boolean) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

interface RouterProviderProps {
  children: ReactNode;
}

export function RouterProvider({ children }: RouterProviderProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>('login');
  const [params, setParams] = useState<any>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const navigate = (route: Route, newParams?: any) => {
    setCurrentRoute(route);
    if (newParams) {
      setParams(newParams);
    } else {
      setParams({});
    }
  };

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    if (value) {
      setIsGuest(false);
      if (currentRoute === 'login' || currentRoute === 'register') {
        navigate('home');
      }
    } else {
      navigate('login');
    }
  };

  const setGuest = (value: boolean) => {
    setIsGuest(value);
    if (value) {
      setIsAuthenticated(false);
      navigate('home');
    }
  };

  return (
    <RouterContext.Provider value={{
      currentRoute,
      navigate,
      params,
      isAuthenticated,
      isGuest,
      setAuthenticated,
      setGuest,
      user,
      setUser,
      showRegisterModal,
      setShowRegisterModal
    }}>
      {children}
    </RouterContext.Provider>
  );
}