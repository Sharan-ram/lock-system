// import packages
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import actions
import { startFetchLocks } from '../../redux/actions/locks'

class LocksContainer extends Component {
  componentDidMount() {
    const { fetchLocks } = this.props
    fetchLocks()
  }
  
  render() {
    return (
      <div>
        Locks
      </div>
    )
  }
}

const mapStateToProps = state => ({

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
