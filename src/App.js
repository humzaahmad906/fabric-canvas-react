import React from 'react';
import store from './store/store'
import {Provider} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import View from './components/mainview'

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <View />
      </Provider>
    </div>
  );
}

export default App;
