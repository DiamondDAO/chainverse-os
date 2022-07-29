import React, { createContext, useState } from 'react';
import { FetchMore } from '../components/SearchOS/SearchOS.component';

// type
export type SearchOSContextState = {
  backendURI: string;
  loading?: boolean;
  data?: any;
  setLoading?: (value: boolean) => void;
  setData?: (data: any) => void;
  fetchMore?: (settings?: FetchMore) => Promise<void>;
  setFetchMore?: any;
  children: React.ReactNode;
};

//context
export const SearchOSClientContext = createContext<
  SearchOSContextState | undefined
>(undefined);
SearchOSClientContext.displayName = 'SearchOSContext';

//provider
const SearchOSClientProvider = (props: SearchOSContextState) => {
  const { backendURI, children } = props;
  const [loading, setLoading] = useState<boolean | undefined>();
  const [data, setData] = useState();
  const [fetchMore, setFetchMore] = useState();
  // Handlers

  // Props
  const propsValue: SearchOSContextState = {
    backendURI,
    loading,
    data,
    setLoading,
    setData,
    children,
    fetchMore,
    setFetchMore,
  };
  return (
    <SearchOSClientContext.Provider value={propsValue}>
      {children}
    </SearchOSClientContext.Provider>
  );
};

export default SearchOSClientProvider;
