import React, { Component } from 'react'

import ConList from './components/ConList.js'
import InputMsg from './components/InputMsg.js'
import UserList from './components/UserList.js'
import ChooseUser from './components/ChooseUser.js'

import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isChoosed: false,
      cons: {
        ids: [
          0,
          1
        ],
        msgs: []
      },
      userCons: [
        0,
        1
      ],
      conUserIds: [
        1,
        2
      ],
      users: {
        0: 'userA',
        1: 'userB',
        2: 'userC'
      },
      userId: 0,
      conId: 0,
      otherId: 1,
      msg: '',
    }
  }

  updateSendMsg (e) {
    this.setState({
      msg: e.target.value
    })
  }

  async submitSendMsg (e) {
    e.preventDefault()

    const res = await fetch('/users/' + this.state.userId + '/' + this.state.conId, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
       userId: this.state.userId,
       msg: this.state.msg
      })
    })
    const cons = await res.json()
    this.setState({
      cons: cons,
      msg: ''
    })
    window.scrollTo(0, document.body.scrollHeight)
  }

  async updateCons () {
    const res = await fetch('/users/' + this.state.userId + '/' + this.state.conId)
    const cons = await res.json()
    const ids = cons.ids
    let id = 0
    for (let i = 0; i < ids.length; ++i) {
      if (ids[i] !== this.state.userId) {
        id = ids[i]
        break
      }
    }
    this.setState({
      otherId: id,
      cons: cons
    })
  }

  async updateConUserIds () {
    let res = await fetch('/users/' + this.state.userId + '/conUserIds')
    res = await res.json()
    this.setState({
      conId: res.userCons[0],
      userCons: res.userCons,
      conUserIds: res.conUserIds
    }, () => {this.updateCons()})
  }

  changeConId (e) {
    this.setState({
      conId: parseInt(e.target.dataset.conid, 10)
    }, () => this.updateCons())
  }

  chooseUserId (e) {
    this.setState({
      isChoosed: true,
      userId: parseInt(e.target.dataset.userid, 10)
    }, () => {
      document.getElementById('msg-text').focus()
      this.updateConUserIds()
    })
  }

  componentDidMount () {
    this.mounted = true
    this.interval = setInterval(() => {
      if (this.mounted) {
        this.updateCons()
      }
    }, 1000)
  }

  componentWillUnmount () {
    this.mounted = false
    clearInterval(this.interval)
  }

  render() {
    if (!this.state.isChoosed) {
      return (
        <div className="App">
          <ChooseUser
            users={this.state.users}
            chooseUserId={this.chooseUserId.bind(this)}
          />
        </div>
      )
    } else {
      return (
        <div className="App">
          <div className="nav">
            <UserList
              users={this.state.users}
              otherId={this.state.otherId}
              userCons={this.state.userCons}
              conUserIds={this.state.conUserIds}
              changeConId={this.changeConId.bind(this)}
            />
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
}

export default App
