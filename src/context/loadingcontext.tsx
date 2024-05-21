// context/LoadingContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface LoadingContextProps {
  isLoading: boolean;
  progress: number;
  setLoading: (isLoading: boolean) => void;
  setProgress: (progress: number | ((prevProgress: number) => number)) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const value = {
    isLoading,
    progress,
    setLoading: setIsLoading,
    setProgress,
  };

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
