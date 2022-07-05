import React, { FC, HTMLAttributes } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import SearchComponent from './Search.component';
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3000/api/graphql',
});
export interface SearchProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  placeholder: string;
  onChange: any;
  onChangeType: any;
  onEnter: any;
  onFocus: any;
}

export const Search: FC<SearchProps> = (props: SearchProps) => {
  return (
    <ApolloProvider client={client}>
      <SearchComponent {...props}/>
    </ApolloProvider>
  );
};

export default Search;
