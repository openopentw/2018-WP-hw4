import React, { Component } from 'react'

import ConList from './components/ConList.js'
import InputMsg from './components/InputMsg.js'

import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cons: {
        ids: [
          0,
          1
        ],
        msgs: []
      },
      users: {
        0: 'userA',
        1: 'userB'
      },
      userId: 0,
      conId: 0,
      otherId: 1,
      msg: '',
    }
  }

  componentDidMount(){
    document.getElementById('msg-text').focus()
  }

  updateSendMsg (e) {
    this.setState({
      msg: e.target.value
    })
  }

  submitSendMsg (e) {
    e.preventDefault()

    fetch('/users/' + this.state.userId + '/' + this.state.conId, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
       userId: this.state.userId,
       msg: this.state.msg
      })
    })
      .then(res => res.json())
      .then(cons => this.setState({
        cons: cons,
        msg: ''
      }))
      .then(() => window.scrollTo(0, document.body.scrollHeight))
  }

  updateCons () {
    fetch('/users/' + this.state.userId + '/' + this.state.conId)
      .then(res => res.json())
      .then(cons => this.setState({cons: cons}))
  }

  render() {
    return (
      <div className="App">
        <div className="nav">
        </div>
        <div className="con">
          <div className="header">
            <h1>{this.state.users[this.state.otherId]}</h1>
          </div>
          <ConList
            cons={this.state.cons.msgs}
            users={this.state.users}
            userId={this.state.userId}
            conId={this.state.conId}
            updateCons={this.updateCons.bind(this)}
          />
          <InputMsg
            msg={this.state.msg}
            updateSendMsg={this.updateSendMsg.bind(this)}
            submitSendMsg={this.submitSendMsg.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default App
