import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './InputMsg.css'

class InputMsg extends Component {
  render () {
    const {msg, updateMsg, postMsg} = this.props
    return (
      <div className="inputMsg">
        <form>
          <div className="text">
            <input
              id="msg-text"
              type="text"
              value={msg}
              onChange={updateMsg}
            />
          </div>
          <div className="submit">
            <input
              type="submit"
              value="SEND"
              onClick={postMsg}
            />
          </div>
        </form>
      </div>
    )
  }
}

InputMsg.propTypes = {
  msg: PropTypes.string,
  updateMsg: PropTypes.func,
  postMsg: PropTypes.func
}

export default InputMsg
