// import actions
import {
  LOCKS_FETCH_START,
  LOCKS_DATA,
  LOCKS_FETCH_FAIL
} from '../../helpers/actions'
// import packages
import Kisi from "kisi-client"
const kisiClient = new Kisi()

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
