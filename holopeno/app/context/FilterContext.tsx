'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type FilterContextValue = {
  filter: string;
  setFilter: (filter: string) => void;
};

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState('');

  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
