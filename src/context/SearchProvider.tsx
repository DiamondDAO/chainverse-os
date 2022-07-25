import React, { FC, useReducer } from 'react';

import { SearchContext, searchReducer } from './';


export interface SearchState {
  property1: boolean;
  children?: React.ReactNode | undefined;
}

const SEARCH_INITIAL_STATE: SearchState = {
  property1: false
}

export const SearchProvider: FC<SearchState> = ({ children }) => {

  const [state, dispatch] = useReducer( searchReducer, SEARCH_INITIAL_STATE );

  return (
    <SearchContext.Provider value={{
      ...state
    }}>
      { children }
    </SearchContext.Provider>
  )
}