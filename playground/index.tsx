import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import SearchOSClientProvider, {
  SearchOS,
  useSearchOSClient,
} from '../src/index';
import ReactJson from 'react-json-view';
import '../dist/chainverse-os.css';
import { Button } from '../src/components/Button';

const SearchComponent = () => {
  const { data, loading, fetchMore } = useSearchOSClient();

  console.log('Search::', { data, loading, fetchMore });
  const handleMore = async () => {
    await fetchMore?.({ limit: 20 });
  };
  const handleOnenter = (term: string) => {
    console.log('term:', term);
  };
  return (
    <>
      <SearchOS
        value="test"
        onFocus={e => console.log(e)}
        onEnter={handleOnenter}
        placeholder="placeholder"
        limit={30}
      />
      <br></br>
      <Button variant="primary" isLoading={loading} onClick={handleMore}>
        Load More
      </Button>
      {/* @ts-ignore */}
      <ReactJson src={data} />
    </>
  );
};

const App = () => {
  const backendURI = 'http://localhost:3000';
  // const backendURI = 'http://localhost:3000/api/graphql';
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
