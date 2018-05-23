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
      allUsersName: {
        // to be fetch
      },
      usersName: {
        // to be fetch
      },
      usersCons: [
        // to be fetch
      ],
      cons: {
        // to be fetch
      },
      isConNewMsg: {
        '-1': false,
        // to be changed
      },
      userId: 0,
      conId: 0,
      frndId: -1,
      msg: '',
    }
  }

  updateMsg (e) {
    this.setState({
      msg: e.target.value
    })
  }

  showNewMsg (cons) {
    let toScrollDown = false
    Object.keys(this.state.cons).map(conId => {
      const oriLen = this.state.cons[conId].msgs.length
      const newLen = cons[conId].msgs.length
      if (oriLen < newLen) {
        if (conId == this.state.conId) {
          toScrollDown = true
        }
        const con = cons[conId]
        for (let i = oriLen; i < newLen; ++i) {
          if (con.msgs[i].authorId !== this.state.userId) {
            let newIsConNewMsg = JSON.parse(JSON.stringify(this.state.isConNewMsg))
            newIsConNewMsg[conId] = true
            this.setState({
              isConNewMsg: newIsConNewMsg
            })
            break
          }
        }
      }
    })
    return toScrollDown
  }

  async getAllUsersName () {
    let res = await fetch(`/users/allUsersName`)
    res = await res.json()
    this.setState({
      allUsersName: res
    })
  }

  async getUsersName () {
    let res = await fetch(`/users/${this.state.userId}/UsersName`)
    res = await res.json()
    this.setState({
      usersName: res
    })
  }

  async getUsersCons () {
    let res = await fetch(`/users/${this.state.userId}/UsersCons`)
    res = await res.json()
    this.setState({
      usersCons: res,
      conId: res[0].conId,
      frndId: res[0].frndIds[0],
    })
  }

  async getCons () {
    let res = await fetch(`/users/${this.state.userId}/cons`)
    res = await res.json()
    let toScrollDown = false
    if (this.state.isChoosed) {
      toScrollDown = await this.showNewMsg(res)
    }
    this.setState({
      cons: res
    }, () => {
      if (toScrollDown) {
        window.scrollTo(0, document.body.scrollHeight)
      }
    })
  }

  async postMsg (e) {
    e.preventDefault()
    // submit
    let res = await fetch(`/users/${this.state.userId}/${this.state.conId}$`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
       msg: this.state.msg
      })
    })
    res = await res.json()
    // get cons
    await this.showNewMsg(res)
    await this.setState({
      cons: res,
      msg: ''
    })
    await window.scrollTo(0, document.body.scrollHeight)
  }

  changeConId (e) {
    const newConId = parseInt(e.target.dataset.conid, 10)
    let newFrndId = this.state.cons[newConId].authors[0]
    if (newFrndId === this.state.userId) {
      newFrndId = this.state.cons[newConId].authors[1]
    }

    let newIsConNewMsg = JSON.parse(JSON.stringify(this.state.isConNewMsg))
    newIsConNewMsg[newConId] = false
    this.setState({
      conId: newConId,
      frndId: newFrndId,
      isConNewMsg: newIsConNewMsg,
    }, () => window.scrollTo(0, document.body.scrollHeight))
  }

  async chooseUserId (e) {
    await this.setState({
      userId: parseInt(e.target.dataset.userid, 10)
    })
    await this.getUsersName()
    await this.getUsersCons()
    await this.getCons()
    await this.setState({
      isChoosed: true,
    }, () => {
      document.getElementById('msg-text').focus()
    })
    await window.scrollTo(0, document.body.scrollHeight)
  }

  componentDidMount () {
    this.getAllUsersName()
    this.getUsersName()
    this.getUsersCons()
    this.mounted = true
    this.interval = setInterval(() => {
      if (this.mounted) {
        this.getCons()
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
            allUsersName={this.state.allUsersName}
            chooseUserId={this.chooseUserId.bind(this)}
          />
        </div>
      )
    } else {
      document.title = this.state.allUsersName[this.state.userId]
      return (
        <div
          className="App"
          onFocus={(() => {
            let newIsConNewMsg = JSON.parse(JSON.stringify(this.state.isConNewMsg))
            newIsConNewMsg[this.state.conId] = false
            this.setState({
              isConNewMsg: newIsConNewMsg
            })
          })}
        >
          <div className="nav">
            <UserList
              frndId={this.state.frndId}
              usersName={this.state.usersName}
              usersCons={this.state.usersCons}
              isConNewMsg={this.state.isConNewMsg}
              changeConId={this.changeConId.bind(this)}
            />
          </div>
          <div className="con">
            <div className="header">
              <h1>{this.state.usersName[this.state.frndId]}</h1>
            </div>
            <ConList
              msgs={this.state.cons[this.state.conId].msgs}
              usersName={this.state.usersName}
              userId={this.state.userId}
              conId={this.state.conId}
            />
            <InputMsg
              msg={this.state.msg}
              updateMsg={this.updateMsg.bind(this)}
              postMsg={this.postMsg.bind(this)}
            />
          </div>
        </div>
      )
    }
  }
}

export default App
