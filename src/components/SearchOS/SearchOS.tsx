import React, { FC, HTMLAttributes } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import SearchComponent from './SearchOS.component';
const client = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: 'http://localhost:3000/api/graphql',
  uri: 'http://staging.chainverse.diamonds/api/graphql',
});
export interface SearchOSProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  placeholder: string;
  onChange?: any;
  onChangeType: any;
  onEnter: any;
  onFocus?: any;
}

export const SearchOS: FC<SearchOSProps> = (props: SearchOSProps) => {
  return (
    <>
      <ApolloProvider client={client}>
        <SearchComponent {...props} />
      </ApolloProvider>
    </>
  );
};

export default SearchOS;
