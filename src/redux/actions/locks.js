// import actions
import {
  // lock fetch actions
  LOCKS_FETCH_START,
  LOCKS_DATA,
  LOCKS_FETCH_FAIL,
  // unlock door actions
  UNLOCK_DOOR_START,
  UNLOCK_DOOR_SUCCESS,
  UNLOCK_DOOR_FAILURE
} from '../../helpers/actions'
// import packages
import Kisi from "kisi-client"
const kisiClient = new Kisi()

// fetch locks
export const startFetchLocks = () => {
  return (dispatch) => {
    dispatch(emitStart())
    kisiClient
      .get('locks')
      .then(locks => {
        console.log("locks", locks)
        dispatch(emitLocksData(locks.data))
      })
      .catch(err => {
        console.log("err", err)
        dispatch(emitLocksFetchFail(err))
      })
  }
}

const emitStart = () => ({
  type: LOCKS_FETCH_START
})

const emitLocksData = (data) => {
  const entities = {}
  const result = data.map(lockObj => {
    const { id } = lockObj
    entities[id] = lockObj
    return id
  })
  return {
    type: LOCKS_DATA,
    entities,
    result
  }
}

export const emitLocksFetchFail = (err) => ({
  type: LOCKS_FETCH_FAIL,
  errMsg: err.reason
})

// unlock a door
export const startUnlockDoor = lockId => {
  return (dispatch) => {
    dispatch(emitStartPost(lockId))
    kisiClient
      .post('locks/' + lockId + '/unlock', {})
      .then(result => {
        console.log("result inside startUnlockDoor", result)
        dispatch(emitUnlockSuccess(lockId))
      })
      .catch(error => {
        console.log(error)
        dispatch(emitUnlockFailure(lockId))
      })
  }
}

const emitStartPost = (lockId) => ({
  type: UNLOCK_DOOR_START,
  lockId
})

const emitUnlockSuccess = (lockId) => ({
  type: UNLOCK_DOOR_SUCCESS,
  lockId
})

const emitUnlockFailure = (lockId) => ({
  type: UNLOCK_DOOR_FAILURE,
  lockId
})
