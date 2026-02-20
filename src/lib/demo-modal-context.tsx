"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface DemoModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const DemoModalContext = createContext<DemoModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DemoModalContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  return useContext(DemoModalContext);
}
