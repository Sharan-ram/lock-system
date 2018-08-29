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

// selectors
export const isFetching = state => state.locks.isFetching
export const getById = state => state.locks.byId
export const getAllIds = state => state.locks.allIds

export const getLocksArray = createSelector(
  getById,
  getAllIds,
  (locksById, allLockIds) => {
    if (allLockIds.length === 0) return []
    return allLockIds.map(id => locksById[id])
  }
)
