// context/NavigationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  breadcrumb: string[];
  setBreadcrumb: (breadcrumb: string[]) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState<string[]>(['Home']);

  return (
    <NavigationContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </NavigationContext.Provider>
  );
};
