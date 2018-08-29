// import packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import actions
import {
  startFetchLocks,
  startUnlockDoor
} from '../../redux/actions/locks'
// import selectors
import {
  isFetching as isLocksfetching,
  errMsg,
  getLocksArray,
  unlockStatus
} from '../../redux/reducers/locks'

class LocksContainer extends Component {
  static propTypes = {
    isLocksfetching: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    locksArray: PropTypes.array.isRequired,
    unlockStatus: PropTypes.object.isRequired,
    fetchLocks: PropTypes.func.isRequired,
    unlockDoor: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleUnlock = this.handleUnlock.bind(this)
  }

  componentDidMount() {
    const { fetchLocks } = this.props
    fetchLocks()
  }

  renderLocks() {
    const { locksArray, unlockStatus } = this.props
    return (
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Select Unlock
            </th>
            <th>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {locksArray.map(lockObj => {
            const { id } = lockObj
            const status = unlockStatus[id]
            return (
              <tr key={lockObj.id}>
                <td>
                  {lockObj.name}
                </td>
                <td>
                  <button
                    type='button'
                    onClick={this.handleUnlock}
                    value={lockObj.id}
                    disabled={this.isButtonDisabled(status)}
                  >
                    Unlock
                  </button>
                </td>
                <td>
                  {status ? status : ''}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  isButtonDisabled(status) {
    if (status) {
      if (status === 'success' || status === 'inProgress') return true
      return false
    }
    return false
  }

  handleUnlock(e) {
    const { value: lockId } = e.target
    const { unlockDoor } = this.props
    unlockDoor(lockId)
  }

  render() {
    const { isLocksfetching, errMsg } = this.props
    return (
      <div>
        {isLocksfetching ?
          'Fetching Locks pls wait' :
          this.renderLocks()
        }
        {!isLocksfetching && errMsg &&
          <div>
            {errMsg}
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLocksfetching: isLocksfetching(state),
  locksArray: getLocksArray(state),
  unlockStatus: unlockStatus(state),
  errMsg: errMsg(state)
})

const mapDispatchToProps = dispatch => ({
  fetchLocks () {
    dispatch(startFetchLocks())
  },
  unlockDoor (lockId) {
    dispatch(startUnlockDoor(lockId))
  }
})

const Locks = connect(
  mapStateToProps, mapDispatchToProps
)(LocksContainer)

export default Locks
