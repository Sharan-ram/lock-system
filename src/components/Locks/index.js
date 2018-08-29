// import packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import actions
import { startFetchLocks } from '../../redux/actions/locks'
// import selectors
import {
  isFetching as isLocksfetching,
  getLocksArray
} from '../../redux/reducers/locks'

class LocksContainer extends Component {
  constructor(props) {
    super(props)
    this.handleUnlock = this.handleUnlock.bind(this)
  }

  componentDidMount() {
    const { fetchLocks } = this.props
    fetchLocks()
  }

  renderLocks() {
    const { locksArray } = this.props
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
          {locksArray.map(lockObj => (
            <tr key={lockObj.id}>
              <td>
                {lockObj.name}
              </td>
              <td>
                <button
                  type='button'
                  onClick={this.handleUnlock}
                  value={lockObj.id}
                >
                  Unlock
                </button>
              </td>
              <td>
                Status
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  handleUnlock(e) {
    const { value } = e.target
    console.log("value", value);
  }

  render() {
    const { isLocksfetching } = this.props
    return (
      <div>
        {isLocksfetching ?
          'Fetching Locks pls wait' :
          this.renderLocks()
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLocksfetching: isLocksfetching(state),
  locksArray: getLocksArray(state)
})

const mapDispatchToProps = dispatch => ({
  fetchLocks() {
    dispatch(startFetchLocks())
  }
})

const Locks = connect(
  mapStateToProps, mapDispatchToProps
)(LocksContainer)

export default Locks
