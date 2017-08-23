var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
  User.findOne({}, function(err, doc) {
    if(err) {
      return res.send("Error!");
    }
    res.render('node', {email: doc.email});
  });
});

router.post('/message', function(req, res, next) {
  var email = req.body.email;
  var user = new User({
    firstName: 'Qing',
    lastName: 'Zeng',
    password: '123456',
    email: email
  });
  user.save();
  res.redirect('/');
});

module.exports = router;
