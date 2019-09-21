var express   = require('express');
var router    = express.Router();
var UnivModel = require('../../models/univModel.js');
var UserModel = require('../../models/userModel.js');

router.get('/', (req, res)=>{
  UnivModel
    .find()
    .then((univs)=>{
        res.json(univs);
    });
});

router.get('/:id', (req, res)=>{
  var UnivId = req.params.id;
  UnivModel
    .findById(UnivId)
    .lean()
    .then((univ)=>{
        const students = [];
        UserModel
          .find({ univ: univ.name })
          .lean()
          .exec((err, user)=>{
            if (err){
              res.send(err);
            } else {
              students.push(user);
              univ.students = students;

              res.send(univ);
            }
          });
    });
});

router.post('/create',function(req,res){
  var Univ = new UnivModel();

  Univ.name = req.body.name;

  Univ.save(function(err) {
    if (err){
      res.send(err);
    } else {
      res.json({ message: 'Success!!' });
    }
  });
});

router.delete('/delete/:id', (req, res)=>{
  var UnivId = req.params.id;
  UnivModel
    .remove({_id: UnivId})
    .then(()=>{
      res.json({
        message: 'Success!'
      });
    });
});

module.exports = router;
