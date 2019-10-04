var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}).then(data => {
    res.json(data)
  }).catch(err => {
    res.json({
      success: false,
      message: 'data not found'
    })
  })
});


router.post('/', (req, res) => {
  const { fullname, message, time } = req.body;
  let response = {
    status: true,
    message: 'data have been added',
    data: null
  }
  let user = new User({ fullname, message })

  user.save().then(data => {
    res.json({
      status: true,
      message: 'data have been added',
      data: {
        _id: data._id,
        fullname: data.fullname,
        messages: data.message
      }
    })
  }).catch(err => {
    response.status = false,
      response.message = 'can not add'
  })
})

router.delete('/:id', (req, res) => {
  let response = {
    status: true,
    message: 'data have been delete',
    data: null
  }
  User.findOneAndRemove({
    _id: req.params.id
  }).then(data => {
    res.json(
      response
    )
  }).catch(err => {
    response.status = false,
      response.message = 'delete failed',
      res.json(response)
  })
})

module.exports = router;
