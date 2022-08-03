import React, { FC, HTMLAttributes } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import SearchComponent from './SearchOS.component';
import { useSearchOSClient } from '../../hooks/useSearchOSClient';
const getClient = (uri: string) => new ApolloClient({
  cache: new InMemoryCache(),
  uri,
});
export interface SearchOSProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  placeholder: string;
  onChange?: any;
  onChangeType?: any;
  onEnter?: any;
  onFocus?: any;
  limit?: number;
}

export const SearchOS: FC<SearchOSProps> = (props: SearchOSProps) => {
  const { backendURI } = useSearchOSClient()
  const client = getClient(backendURI)
  return (
    <>
      <ApolloProvider client={client}>
        <SearchComponent {...props} />
      </ApolloProvider>
    </>
  );
};

export default SearchOS;
