"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface PrivacyModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const PrivacyModalContext = createContext<PrivacyModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function PrivacyModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PrivacyModalContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </PrivacyModalContext.Provider>
  );
}

export function usePrivacyModal() {
  return useContext(PrivacyModalContext);
}
