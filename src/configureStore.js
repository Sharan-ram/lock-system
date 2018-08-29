// import packages
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import Root reducer
import RootReducer from './redux/reducers/index.js'

const configureStore = () => {
  const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )
  return store
}

export default configureStore
