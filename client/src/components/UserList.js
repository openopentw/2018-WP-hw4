import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './UserList.css'

class UserItem extends Component {
  render () {
    const {conId, userName, isActive, isNewMsg, changeConId} = this.props
    return (
      <button
        className={`userItem ${(isActive? ' active' : '')} ${(isNewMsg? ' newmsg' : '')}`}
        data-conid={conId}
        onClick={changeConId}
      >
        <div className="userName">{userName}</div>
      </button>
    )
  }
}

UserItem.propTypes = {
  conId: PropTypes.number,
  userName: PropTypes.string,
  isActive: PropTypes.bool,
  isNewMsg: PropTypes.bool,
  changeConId: PropTypes.func
};

class UserList extends Component {
  render () {
    const {frndId, usersName, usersCons, isConNewMsg, changeConId} = this.props
    return (
      <div className="userList">
        {usersCons.map(c => (
          <UserItem
            key={c.conId}
            conId={c.conId}
            userName={usersName[c.frndIds[0]]}
            isActive={frndId === c.frndIds[0]}
            isNewMsg={(c.conId in isConNewMsg)? isConNewMsg[c.conId] : false}
            changeConId={changeConId}
          />
        ))}
      </div>
    )
  }
}

UserList.propTypes = {
  frndId: PropTypes.number,
  usersName: PropTypes.object,
  usersCons: PropTypes.array,
  isConNewMsg: PropTypes.object,
  changeConId: PropTypes.func,
}

export default UserList
