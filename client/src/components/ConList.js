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
  render () {
    const {msgs, usersName, userId} = this.props
    return (
      <div
        className="conList"
        onClick={() => document.getElementById('msg-text').focus()}
      >
        {msgs.map((m, id) =>
          <ConItem
            key={id}
            isMe={m.authorId === userId}
            userName={usersName[m.authorId]}
            msg={m.msg}
          />
        )}
      </div>
    )
  }
}

ConList.propTypes = {
  msgs: PropTypes.array,
  usersName: PropTypes.object,
  userId: PropTypes.number,
}

export default ConList
