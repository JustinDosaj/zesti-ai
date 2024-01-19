// context/NavigationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { db } from '../firebase/firebase';

interface NavigationContextType {
  history: string[];
  addPageToHistory: (path: string) => void;
  historyName: string[];
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
  const [history, setHistory] = useState<string[]>([]);
  const [historyName, setHistoryName] = useState<string[]>([])

  const addPageToHistory = async (path: string) => {

    try {
      let segments = path.split('/')
      let recipeId = segments.pop()
      const doc = await db.collection('recipes-tiktok').doc(recipeId).get()
      if(doc.exists) { 

        const name = doc.data()?.name

        setHistory((prevHistory) => [...prevHistory, path])
        setHistoryName((prevHistory) => [...prevHistory, name])
      } else { 
        
    setHistory((prevHistory) => [...prevHistory, path]);
    setHistoryName((prevHistory) => [...prevHistory, path]);
      }
    } catch (err) {
      console.log("Failed to save history: ", err)
    }
  };

  return (
    <NavigationContext.Provider value={{ history, addPageToHistory, historyName }}>
      {children}
    </NavigationContext.Provider>
  );
};
