import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './InputMsg.css'

class InputMsg extends Component {
  render () {
    return (
      <div className="inputMsg">
        <form>
          <div className="text">
            <input
              id="msg-text"
              type="text"
              value={this.props.msg}
              onChange={this.props.updateSendMsg}
            />
          </div>
          <div className="submit">
            <input
              type="submit"
              value="SEND"
              onClick={this.props.submitSendMsg}
            />
          </div>
        </form>
      </div>
    )
  }
}

InputMsg.propTypes = {
  msg: PropTypes.string,
  updateSendMsg: PropTypes.func,
  submitSendMsg: PropTypes.func
}

export default InputMsg
