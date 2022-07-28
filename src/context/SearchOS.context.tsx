import React, { createContext, FC, useState } from 'react';

// type
export type SearchOSContextState = {
  backendURI: string;
  loading?: boolean;
  data?: any;
  setLoading?: (value: boolean) => void;
  setData?: (data: any) => void;
  children: React.ReactNode
};

//context
export const SearchOSClientContext = createContext<
  SearchOSContextState | undefined
>(undefined);
SearchOSClientContext.displayName = 'SearchOSContext';

//provider
export const SearchOSClientProvider = (props: SearchOSContextState)=> {
  const { backendURI, children } = props;
  const [loading, setLoading] = useState<boolean | undefined>();
  const [data, setData] = useState();
  // Handlers

  // Props
  const propsValue: SearchOSContextState = {
    backendURI,
    loading,
    data,
    setLoading,
    setData,
    children
  };
  return (
      <SearchOSClientContext.Provider value={propsValue}>
        {children}
      </SearchOSClientContext.Provider>
  );
};
