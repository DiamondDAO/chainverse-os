import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { SearchOS, SearchOSClientProvider, useSearchOSClient } from '../src/index';
import ReactJson from 'react-json-view';
import '../dist/chainverse-os.css';

const SearchComponent = () => {
  const { data, loading } = useSearchOSClient()

  console.log('Search::', {data, loading});
  return (
    <>
      <SearchOS
        value="test"
        // onChange={e => console.log(e)}
        onFocus={e => console.log(e)}
        placeholder="placeholder"
      />
      <ReactJson src={data} />
    </>
  );
};

const App = () => {
  const backendURI = 'http://localhost:3000/api/graphql';
  // const backendURI = 'http://staging.chainverse.diamonds/api/graphql'

  return (
    <div className="mx-auto w-[70%] space-y-5">
      <SearchOSClientProvider backendURI={backendURI}>
        <SearchComponent />
      </SearchOSClientProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
