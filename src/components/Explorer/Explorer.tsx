import React, { FC } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// import './Explorer.module.css';
// import client from '../../services/Apollo/ApoloClient';
import Search from './Search';
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3000/api/graphql',
})
export type ExplorerProps = {
  value: string;
  placeholder: string;
  onchange: any;
  onKeyPress: any;
  onFocus: any;
};

export const Explorer: FC<ExplorerProps> = () => {

  return (
    <ApolloProvider client={client}>
      <Search />
    </ApolloProvider>
  );
};

export default Explorer;
