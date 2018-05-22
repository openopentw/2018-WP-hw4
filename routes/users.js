let express = require('express')
let router = express.Router()

/* Structure of Data:
 *
 * UsersName [userId] :
 *     name
 *
 * UsersCons [userId] (array of objects) :
 *     conId // conversations
 *     frndIds (array of frndId) : // friends' indexes
 *         frndId
 *
 * Cons [conId] : // conversations
 *     authors (array of authorId) :
 *         authorId
 *     msgs (array of objects) : // messages
 *         authorId
 *         msg
 *
 */

let UsersName = {
  0: 'userA',
  1: 'userB',
  2: 'userC'
}

let UsersCons = {
  0: [
    {
      conId: 0,
      frndIds: [
        1,
      ],
    },
    {
      conId: 1,
      frndIds: [
        2,
      ],
    },
  ],
  1: [
    {
      conId: 0,
      frndIds: [
        0,
      ],
    },
    {
      conId: 2,
      frndIds: [
        2,
      ],
    },
  ],
  2: [
    {
      conId: 1,
      frndIds: [
        0,
      ],
    },
    {
      conId: 2,
      frndIds: [
        1,
      ],
    },
  ],
}

let Cons = {
  0: {
    authors: [
      0,
      1,
    ],
    msgs: [
      {
        authorId: 0,
        msg: 'hi',
      },
      {
        authorId: 1,
        msg: '???',
      },
      {
        authorId: 1,
        msg: 'Who are you?',
      },
    ]
  },
  1: {
    authors: [
      0,
      2,
    ],
    msgs: [
      {
        authorId: 0,
        msg: 'hey',
      },
      {
        authorId: 0,
        msg: 'you forget to turn off the light',
      },
      {
        authorId: 2,
        msg: 'sorry, can you do that for me? thx',
      },
    ]
  },
  2: {
    authors: [
      1,
      2,
    ],
    msgs: [
      {
        authorId: 2,
        msg: 'hey, what a beautiful day!',
      },
      {
        authorId: 2,
        msg: 'let\'s go biking!',
      },
      {
        authorId: 1,
        msg: 'good idea!',
      },
      {
        authorId: 1,
        msg: 'i will be there at 10.',
      },
    ]
  },
}

router.get('/allUsersName', function(req, res, next) {
  res.json(UsersName)
})

router.get('/:userId/UsersName', function(req, res, next) {
  const userId = parseInt(req.params.userId, 10)
  let usersName = {}
  if (userId in UsersCons) {
    const userCons = UsersCons[userId]
    for (let i = 0; i < userCons.length; ++i) {
      userCons[i].frndIds.map(id => {
        usersName[id] = UsersName[id]
      })
    }
  }
  res.json(usersName)
})

router.get('/:userId/UsersCons', function(req, res, next) {
  const userId = parseInt(req.params.userId, 10)
  if (userId in UsersCons) {
    res.json(UsersCons[userId])
  } else {
    res.json(null)
  }
})

router.get('/:userId/Cons', function(req, res, next) {
  const userId = parseInt(req.params.userId, 10)
  let retCons = {}
  if (userId in UsersCons) {
    UsersCons[userId].map(uc => {
      retCons[uc.conId] = Cons[uc.conId]
    })
  }
  res.json(retCons)
})

router.post('/:userId/:conId', function(req, res, next) {
  const userId = parseInt(req.params.userId)
  const conId = parseInt(req.params.conId)
  // push data
  if (conId in Cons) {
    Cons[conId].msgs.push({
      authorId: userId,
      msg: req.body.msg,
    })
  }
  // return data
  let retCons = {}
  if (userId in UsersCons) {
    UsersCons[userId].map(uc => {
      retCons[uc.conId] = Cons[uc.conId]
    })
  }
  res.json(retCons)
})

module.exports = router
