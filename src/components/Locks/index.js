// import packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import material ui components
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
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

const styles = {
  Container: {
    margin: 50,
    overflow: 'auto'
  },
  Spinner: {
    width: 100,
    height: 100,
    position: 'absolute',
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  }
}

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
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Select Unlock
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locksArray.map(lockObj => {
              const { id, name } = lockObj
              const status = unlockStatus[id]
              console.log("status inside render", status);
              return (
                <TableRow key={id}>
                  <TableCell>
                    {name}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={(e) => { this.handleUnlock(e, id) }}
                      id={id}
                      disabled={this.isButtonDisabled(status)}
                    >
                      Unlock
                    </Button>
                  </TableCell>
                  <TableCell>
                    {this.getStatus(status)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  isButtonDisabled(status) {
    if (status) {
      if (status === 'success' || status === 'inProgress') return true
      return false
    }
    return false
  }

  handleUnlock(e, lockId) {
    const { unlockDoor } = this.props
    unlockDoor(lockId)
  }

  getStatus(status) {
    console.log("status inside getStatus", status);
    if (status === 'inProgress') {
      return <CircularProgress color="secondary" />
    }
    if (status) return status
    return ''
  }

  render() {
    const { isLocksfetching, errMsg } = this.props
    return (
      <div style={styles.Container}>
        {isLocksfetching ?
          <div style={styles.Spinner}>
            <CircularProgress color="secondary" />
          </div> :
          <div>
            <Typography
              variant='display1'
              paragraph
              gutterBottom
            >
              Showing a list of locks, click on the unlock button
                to unlock the door and to update the status
            </Typography>
            {this.renderLocks()}
          </div>
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
