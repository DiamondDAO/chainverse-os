import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Explorer } from '../src/index';

const App = () => {
  return (
    <div>
      <Explorer
        value="test"
        onchange={e => console.log(e)}
        onKeyPress={e => console.log(e)}
        onFocus={e => console.log(e)}
        placeholder="placeholder"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
