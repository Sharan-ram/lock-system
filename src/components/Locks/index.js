// import packages
import React, { Component } from 'react'
import { connect } from 'react-redux'

class LocksContainer extends Component {
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

})

const Locks = connect(
  mapStateToProps, mapDispatchToProps
)(LocksContainer)

export default Locks
