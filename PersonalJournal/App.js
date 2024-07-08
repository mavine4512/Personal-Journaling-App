import React from 'react';
import {createStore} from 'redux';
import { Provider as PaperProvider } from 'react-native-paper';
import {Provider} from 'react-redux';
import reducer from './src/redux/reducer';
import Main from './src/main';

const store = createStore(reducer);
const App = () => {

  return (
    // <PaperProvider>
      <Provider store={store}>
       <Main/>
    </Provider>
    // </PaperProvider>
    
  );
};

export default App;
