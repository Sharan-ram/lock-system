// import packages
import { combineReducers } from 'redux'
// import reducers
import { locks } from './locks'

const RootReducer = combineReducers({
  locks
})

export default RootReducer
