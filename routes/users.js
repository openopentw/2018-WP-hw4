let express = require('express')
let router = express.Router()

let users = {
  0: 'userA',
  1: 'userB',
  2: 'userC'
}

let userIdToCons = {
  0: [
    0,
    1
  ],
  1: [
    0,
    2
  ],
  2: [
    1,
    2
  ]
}

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
  },
  1: {
    ids: [
      0,
      2
    ],
    msgs: [
      {
        id: 0,
        userId: 0,
        msg: 'hey'
      },
      {
        id: 1,
        userId: 0,
        msg: 'you forget to turn off the light'
      },
      {
        id: 2,
        userId: 2,
        msg: 'sorry, can you do that for me? thx'
      }
    ]
  },
  2: {
    ids: [
      1,
      2
    ],
    msgs: [
      { id: 0,
        userId: 2,
        msg: 'hey, what a beautiful day!'
      },
      {
        id: 1,
        userId: 2,
        msg: 'let\'s go biking!'
      },
      {
        id: 2,
        userId: 1,
        msg: 'good idea!'
      },
      {
        id: 3,
        userId: 1,
        msg: 'i will be there at 10.'
      }
    ]
  }
}

router.get('/:userId/conUserIds', function(req, res, next) {
  let userId = parseInt(req.params.userId)
  if (userId in users) {
    let userCons = userIdToCons[userId]

    let conUserIds = []
    for (let i = 0; i < userCons.length; ++i) {
      let ids = cons[userCons[i]].ids
      for (let j = 0; j < ids.length; ++j) {
        if (ids[j] != userId) {
          conUserIds.push(ids[j])
          break;
        }
      }
    }
    res.json({
      userCons: userCons,
      conUserIds: conUserIds
    })
  }
})

router.get('/:userId/:conId', function(req, res, next) {
  let conId = parseInt(req.params.conId)
  if (conId in cons) {
    res.json(cons[conId])
  }
})

router.post('/:userId/:conId', function(req, res, next) {
  let conId = parseInt(req.params.conId)
  if (conId in cons) {
    const newId = cons[conId].msgs.length
    cons[conId].msgs.push({
      id: newId,
      userId: parseInt(req.body.userId),
      msg: req.body.msg
    })
    res.json(cons[conId])
  }
})

module.exports = router
