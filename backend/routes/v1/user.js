var express   = require('express');
var router    = express.Router();
var UserModel = require('../../models/userModel.js');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './../frontend/src/assets/user')
  },
  filename: function (req, file, cb) {
    const imageName = `${Math.random().toString(36).slice(-9)}_${Date.now()}.png`
    cb(null, imageName)
  }
})
const upload = multer({ storage: storage }).single('file')

//ユーザー一覧を返す
router.get('/', (req, res)=>{
  UserModel
    .find()
    .then((users)=>{
        res.json(users);
    });
});

//特定のユーザーの情報を返す
router.get('/:id', (req, res)=>{
  var UserId = req.params.id;
  UserModel
    .findById(UserId)
    .then((user)=>{
        res.json(user);
    });
});

//ユーザー新規作成
router.post('/create',function(req,res){
  const User = new UserModel();

  User.name = req.body.name;
  User.bio = req.body.bio;
  User.age = req.body.age;
  User.year = req.body.year;
  User.month = req.body.month;
  User.date = req.body.date;
  User.univ = req.body.univ;
  User.image = req.body.image;

  User.save(function(err) {
    if (err){
      res.send(err);
    } else {
      res.json({ message: 'Success!!' });
    }
  });
});

//検索条件に合うユーザーを返す
router.post('/search',function(req,res){
  const query = {};
  if(req.body.name){
    query.name = req.body.name;
  }
  if(req.body.age){
    query.age = req.body.age;
  }
  if(req.body.year){
    query.year = req.body.year;
  }
  if(req.body.month){
    query.month = req.body.month;
  }
  if(req.body.date){
    query.date = req.body.date;
  }
  if(req.body.univ){
    query.univ = req.body.univ;
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

//画像以外のユーザー情報を更新
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

//特定のユーザーを削除
router.delete('/delete/:id', (req, res)=>{
  var UserId = req.params.id;
  UserModel
    .find({_id: UserId}, (err, user)=>{
      try {
        if(fs.statSync("./../frontend/src/assets/user/" + user[0].image)){
          fs.unlinkSync("./../frontend/src/assets/user/" + user[0].image);
        }
      }catch(err){
        console.log(err);
      }
    })
    .deleteOne({_id: UserId})
    .then(()=>{
      res.json({
        message: 'Success!'
      });
    });
});

//ユーザーの画像を登録
router.post('/image/:name', upload, (req, res) => {
  var UserName = req.params.name;
  console.log(UserName);
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      UserModel
        .find({name: UserName}, (err, user)=>{
          user[0].image = res.req.file.filename;
          user[0].save((err)=>{
            if(err){
              res.send(err);
            }else{
              res.json({messabe: 'Success!'});
            }
          });
        });
    }
  })
});

//ユーザーの画像を更新
router.post('/image/update/:name', upload, (req, res) => {
  var UserName = req.params.name;
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      UserModel
        .find({name: UserName}, (err, user)=>{
          try {
            if(fs.statSync("./../frontend/src/assets/user/" + user[0].image)){
              fs.unlinkSync("./../frontend/src/assets/user/" + user[0].image);
            }
          }catch(err){
            console.log(err);
          }
          user[0].image = req.file.filename;
          user[0].save((err)=>{
            if(err){
              res.send(err);
            }else{
              res.json({messabe: 'Success!'});
            }
          });
        });
    }
  })
});

module.exports = router;
