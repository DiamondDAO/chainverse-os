# ChainverseOS

ChainverseOS is a TypeScrip library to implement a powerfull search engine


# Installation
## npm:
```
npm install @chainverse/os
```

## yarn:
```
yarn add @chainverse/os
```
# Usage
```tsx
import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import SearchOSClientProvider, {
  SearchOS,
  useSearchOSClient,
} from '@chainverse/os';
import '../dist/chainverse-os.css';

const YourSearchComponent = () => {
  const { fetchMore } = useSearchOSClient();
  const handleMore = async () => {
    await fetchMore?.({ limit: # });
  };
  return (
    <>
      <SearchOS
        placeholder="placeholder"
        limit={ # }
      />
    </>
  );
};

const App = () => {
  const backendURI = 'http://YourBackendURI/api/graphql';
  return (
    <div className='' >
      <SearchOSClientProvider backendURI={backendURI}>
        <YourSearchComponent />
      </SearchOSClientProvider>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```
## Build and launch ChainversOS
```
npm run build
npm start
```





