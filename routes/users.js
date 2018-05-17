let express = require('express')
let router = express.Router()

// TODO:
// let users = {
//   0: 'userA',
//   1: 'userB'
// }

let cons = {
  0: {
    ids: [
      0,
      1
    ],
    msgs: [
      {
        id: 0,
        userId: 0,
        msg: 'hi'
      },
      {
        id: 1,
        userId: 1,
        msg: '???'
      },
      {
        id: 2,
        userId: 1,
        msg: 'Who are you?'
      }
    ]
  }
}

router.get('/:userId/:conId', function(req, res, next) {
  let conId = parseInt(req.params.conId)
  if (conId in cons) {
    res.json(cons[conId])
  }
})

router.post('/:userId/:conId', function(req, res, next) {
  let conId = parseInt(req.params.conId)
  if (conId in cons) {
    cons[conId].msgs.push({
      id: cons[conId].length,
      userId: parseInt(req.body.userId),
      msg: req.body.msg
    })
    res.json(cons[conId])
  }
})

module.exports = router
