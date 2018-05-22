import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './UserList.css'

class UserItem extends Component {
  render () {
    const {conId, userName, isActive, changeConId} = this.props
    return (
      <button
        className={`userItem ${(isActive? ' active' : '')}`}
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
  changeConId: PropTypes.func
};

class UserList extends Component {
  render () {
    const {frndId, usersName, usersCons, changeConId} = this.props
    let userItemList = []
    usersCons.map(c => {
      userItemList.push(
        <UserItem
          key={c.conId}
          conId={c.conId}
          userName={usersName[c.frndIds[0]]}
          isActive={frndId === c.frndIds[0]}
          changeConId={changeConId}
        />
      )
    })
    return (
      <div className="userList">
        {userItemList}
      </div>
    )
  }
}

UserList.propTypes = {
  frndId: PropTypes.number,
  usersName: PropTypes.object,
  usersCons: PropTypes.array,
  changeConId: PropTypes.func,
}

export default UserList
