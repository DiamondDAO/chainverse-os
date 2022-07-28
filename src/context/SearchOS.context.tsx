import React, { createContext, FC, useState } from 'react';

// type
export type SearchOSContextState = {
  backendURI: string;
  loading?: boolean;
  data?: any;
  setLoading?: (value: boolean) => void;
  setData?: (data: any) => void;
};

//context
export const SearchOSClientContext = createContext<
  SearchOSContextState | undefined
>(undefined);
SearchOSClientContext.displayName = 'SearchOSContext';

//provider
export const SearchOSClientProvider: FC<SearchOSContextState> = ({
  children,
  ...rest
}): JSX.Element => {
  const { backendURI } = rest;
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
  };
  return (
      <SearchOSClientContext.Provider value={propsValue}>
        {children}
      </SearchOSClientContext.Provider>
  );
};
