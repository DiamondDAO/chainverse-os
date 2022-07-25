import { createContext } from 'react';


interface ContextProps {
  property1: boolean;
}

export const SearchContext = createContext({} as ContextProps );