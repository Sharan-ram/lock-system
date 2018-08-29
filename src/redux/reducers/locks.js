// import packages
import { createSelector } from 'reselect'
// import actions
import {
  // fetch actions
  LOCKS_FETCH_START,
  LOCKS_DATA,
  LOCKS_FETCH_FAIL,
  // post actions
  UNLOCK_DOOR_START,
  UNLOCK_DOOR_SUCCESS,
  UNLOCK_DOOR_FAILURE
} from '../../helpers/actions'

const initialState = {
  isFetching: false,
  byId: {},
  allIds: [],
  errMsg: '',
  unlockStatus: {}
}

export const locks = (state = initialState, action) => {
  switch (action.type) {
    case LOCKS_FETCH_START:
      return Object.assign({}, state, {
        isFetching: true,
        errMsg: '',
        unlockInProgress: false
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
    case UNLOCK_DOOR_START:
      return Object.assign({}, state, {
        unlockStatus: {
          ...state.unlockStatus,
          [action.lockId]: 'inProgress'
        }
      })
    case UNLOCK_DOOR_SUCCESS:
      return Object.assign({}, state, {
        unlockStatus: {
          ...state.unlockStatus,
          [action.lockId]: 'success'
        }
      })
    case UNLOCK_DOOR_FAILURE:
      return Object.assign({}, state, {
        unlockStatus: {
          ...state.unlockStatus,
          [action.lockId]: 'failure'
        }
      })
    default: return state
  }
}

// selectors
export const isFetching = state => state.locks.isFetching
export const errMsg = state => state.locks.errMsg
export const getById = state => state.locks.byId
export const getAllIds = state => state.locks.allIds
export const unlockStatus = state => state.locks.unlockStatus

export const getLocksArray = createSelector(
  getById,
  getAllIds,
  (locksById, allLockIds) => {
    if (allLockIds.length === 0) return []
    return allLockIds.map(id => locksById[id])
  }
)
