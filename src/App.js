import React, { Component } from 'react'
import GetRouter from './router'
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GetRouter />
      </Provider>
    );
  }
}

export default App;
