var express   = require('express');
var router    = express.Router();
var UserModel = require('../../models/userModel.js');

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

router.post('/create',function(req,res){
  const User = new UserModel();

  User.name = req.body.name;
  User.bio = req.body.bio;
  User.age = req.body.age;
  User.year = req.body.year;
  User.month = req.body.month;
  User.date = req.body.date;
  User.univ = req.body.univ;

  User.save(function(err) {
    if (err){
      res.send(err);
    } else {
      res.json({ message: 'Success!!' });
    }
  });
});

router.post('/search',function(req,res){
  const query = {};
  if(req.body.name){
    query.name = req.body.name;
  }
  if(req.body.age){
    query.age = req.body.age;
  }
  UserModel
    .find(query, (err, users)=>{
      if(err){
        res.send(err);
      }else{
        res.json(users);
      }
    });
});

router.put('/update/:id', (req, res)=>{
  var UserId = req.params.id;
  UserModel
    .findById(UserId, (err, user)=>{
      if(err){
        res.send(err);
      }else{
        user.name = req.body.name;
        user.bio = req.body.bio;
        user.age = req.body.age;
        user.year = req.body.year;
        user.month = req.body.month;
        user.date = req.body.date;
        user.univ = req.body.univ;

        user.save((err)=>{
          if(err){
            res.send(err);
          }else{
            res.json({messabe: 'Success!'});
          }
        });
      }
    });
});

router.delete('/delete/:id', (req, res)=>{
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
