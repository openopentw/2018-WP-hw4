import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './UserList.css'

class UserItem extends Component {
  render () {
    const {userName, isActive, conId, changeConId} = this.props
    const className = 'userItem' + (isActive? ' active' : '')
    return (
      <button
        className={className}
        data-conid={conId}
        onClick={changeConId}
      >
        <div className="userName">{userName}</div>
      </button>
    )
  }
}

UserItem.propTypes = {
  userName: PropTypes.string,
  conId: PropTypes.number,
  isActive: PropTypes.bool,
  changeConId: PropTypes.func
};

class UserList extends Component {
  render () {
    const {otherId, userCons, conUserIds, users, changeConId} = this.props
    let userItemList = []
    for (let i = 0; i < userCons.length; ++i) {
      const u = userCons[i]
      const c = conUserIds[i]
      userItemList.push(
        <UserItem
          key={u}
          conId={u}
          userName={users[c]}
          isActive={otherId === c}
          changeConId={changeConId}
        />
      )
    }
    return (
      <div className="userList">
        {userItemList}
      </div>
    )
  }
}

UserList.propTypes = {
  otherId: PropTypes.number,
  userCons: PropTypes.array,
  conUserIds: PropTypes.array,
  users: PropTypes.object,
  changeConId: PropTypes.func,
}

export default UserList
