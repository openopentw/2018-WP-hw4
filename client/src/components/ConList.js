import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './ConList.css'

class ConItem extends Component {
  render () {
    const {isMe, userName, msg} = this.props
    const className = 'conItem' + (isMe? ' me' : ' other')
    const displayName = isMe? 'Me' : userName
    return (
      <div
        className={className}
      >
        <div className="inside">
          <div className="userName">{displayName}</div>
          <div className="msg">{msg}</div>
        </div>
      </div>
    )
  }
}

ConItem.propTypes = {
  isMe: PropTypes.bool,
  userName: PropTypes.string,
  msg: PropTypes.string
};

class ConList extends Component {
  componentDidMount () {
    // this.props.updateCons()
  }

  render () {
    return (
      <div className="conList" onClick={() => document.getElementById('msg-text').focus()}>
        {this.props.cons.map(c =>
          <ConItem
            key={c.id}
            isMe={c.userId === this.props.userId}
            userName={this.props.users[c.userId]}
            msg={c.msg}
          />
        )}
      </div>
    )
  }
}

ConList.propTypes = {
  cons: PropTypes.array,
  users: PropTypes.object,
  userId: PropTypes.number,
  updateCons: PropTypes.func
}

export default ConList
