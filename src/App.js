// import packages
import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Kisi from "kisi-client"
// import functions
import configureStore from './configureStore'
// import components
import Locks from './components/Locks'

const kisiClient = new Kisi()
// set api key
const API_KEY = '94c2056abb993b570517f2d3a89c9b5a'
kisiClient.setLoginSecret(API_KEY)

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
