'use client';

import { createContext, useContext, useState } from 'react';

interface StoreContextValue {
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const StoreContext = createContext<StoreContextValue>({
  drawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <StoreContext.Provider
      value={{
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
