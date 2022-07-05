import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { SearchOS } from '../src/index';
import ReactJson from 'react-json-view';
import '../dist/chainverse-os.css';

const App = () => {
  const [data, setData] = useState({});
  return (
    <div className="mx-auto w-[70%] space-y-5">
      <SearchOS
        value="test"
        onChange={e => console.log(e)}
        onChangeType={e => setData(e)}
        onEnter={e => setData(e)}
        onFocus={e => console.log(e)}
        placeholder="placeholder"
      />
      <ReactJson src={data} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
