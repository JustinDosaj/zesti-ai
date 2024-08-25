// context/ModalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalStatus = 'info' | 'error' | 'success' | 'warning' | 'auth';

interface ModalContextProps {
  isOpen: boolean;
  title: string;
  text: string;
  role?: string | null;
  displayAd: boolean;
  status: ModalStatus;
  recipeId?: string;
  slug?: string;
  userId?: string;
  openModal: (title: string, text: string, status: ModalStatus, displayAd?: boolean, role?: string | null, recipeId?: number, slug?:string, userId?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [displayAd, setDisplayAd] = useState(false);
  const [status, setStatus] = useState<ModalStatus>('info');
  const [recipeId, setRecipeId] = useState('');
  const [slug, setSlug] = useState('');
  const [userId, setUserId] = useState('');

  const openModal = (title: string, text: string, status: ModalStatus, displayAd = false, role: string | null = null, recipeId = 0, slug = '', userId = '') => {
    setTitle(title);
    setText(text);
    setStatus(status);
    setDisplayAd(displayAd);
    setRecipeId(recipeId.toString());
    setSlug(slug);
    setUserId(userId);
    setRole(role);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, title, text, role, displayAd, status, recipeId, slug, userId, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
