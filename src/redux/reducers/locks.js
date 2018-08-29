// import packages
import { createSelector } from 'reselect'
// import actions
import {
  LOCKS_FETCH_START,
  LOCKS_DATA,
  LOCKS_FETCH_FAIL
} from '../../helpers/actions'

const initialState = {
  isFetching: false,
  byId: {},
  allIds: [],
  errMsg: ''
}

export const locks = (state = initialState, action) => {
  switch (action.type) {
    case LOCKS_FETCH_START:
      return Object.assign({}, state, {
        isFetching: true,
        errMsg: ''
      })
    case LOCKS_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        byId: action.entities,
        allIds: action.result
      })
    case LOCKS_FETCH_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        errMsg: action.errMsg
      })
    default: return state
  }
}
