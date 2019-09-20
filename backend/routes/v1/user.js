var express   = require('express');
var router    = express.Router();
var UserModel = require('../../models/userModel.js');
var UnivModel = require('../../models/univModel.js');
const mongoose = require('mongoose');

router.get('/', (req, res)=>{
  UserModel
    .find()
    .then((users)=>{
        res.json(users);
    });
});

router.get('/:id', (req, res)=>{
  var UserId = req.params.id;
  UserModel
    .findById(UserId)
    .then((user)=>{
        res.json(user);
    });
});

router.post('/',function(req,res){
  var User = new UserModel();

  User.name = req.body.name;
  User.bio = req.body.bio;
  User.age = req.body.age;

  User.save(function(err) {
    if (err){
      res.send(err);
    } else {
      res.json({ message: 'Success!!' });
    }
  });
});

router.delete('/:id', (req, res)=>{
  var UserId = req.params.id;
  UserModel
    .remove({_id: UserId})
    .then(()=>{
      res.json({
        message: 'Success!'
      });
    });
});

module.exports = router;
