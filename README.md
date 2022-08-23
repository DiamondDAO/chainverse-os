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

# Configuration
## SearchOSClientProvider

Receive the backendURI as property and YourSearchComponent as children  
You <b>need</b> to wrap YourSearchComponent with SearchOSClientProvider
## fetchMore
Sets the number of results to get with each extra load of data
```
fetchMore?.({ limit: int }):
```

## SearchOS
The <b>limit</b> property of SearchOS sets the number of results to get on the first data load.
```
  limit={ int }
```

## backendURI
Connection address to the backend of your app  
Sent as property to SearchOSClientProvider


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
    await fetchMore?.({ limit: int });
  };
  return (
    <>
      <SearchOS
        placeholder="placeholder"
        limit={ int }
      />
    </>
  );
};

const App = () => {
  const backendURI = 'http://YourBackendURI';
  return (
    <div>
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





