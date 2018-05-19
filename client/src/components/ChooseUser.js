import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './ChooseUser.css'

class UserItem extends Component {
  render () {
    const {id, userName, chooseUserId} = this.props
    return (
      <div className="UserItem">
        <button
          data-userid={id}
          onClick={chooseUserId}
        >
          {userName}
        </button>
      </div>
    )
  }
}

UserItem.propTypes = {
  id: PropTypes.number,
  userName: PropTypes.string,
  chooseUserId: PropTypes.func
}

class ChooseUser extends Component {
  render () {
    const {users, chooseUserId} = this.props
    return (
      <div className="ChooseUser">
        <p>Choose a username to login:</p>
        <div className="UserItemList">
          {
            Object.keys(users).map((key, index) => {
              return (
                <UserItem
                  key={parseInt(key, 10)}
                  id={parseInt(key, 10)}
                  userName={users[key]}
                  chooseUserId={chooseUserId}
                />
              )}
            )
          }
        </div>
      </div>
    )
  }
}

ChooseUser.propTypes = {
  users: PropTypes.object,
  chooseUserId: PropTypes.func
}

export default ChooseUser
