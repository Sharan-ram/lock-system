// import packages
import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
// import functions
import configureStore from './configureStore'
// import components
import Locks from './components/Locks'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Locks} />
      </Switch>
    </Router>
  </Provider>
)

export default App
