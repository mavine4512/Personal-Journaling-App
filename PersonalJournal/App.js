import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/redux/reducer';
import Main from './src/main';

const store = createStore(reducer);
const App = () => {

  return (
      <Provider store={store}>
       <Main/>
    </Provider>
    
  );
};

export default App;
