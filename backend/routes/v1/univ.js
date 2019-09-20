var express   = require('express');
var router    = express.Router();
var UserModel = require('../../models/userModel.js');
var UnivModel = require('../../models/univModel.js');
const mongoose = require('mongoose');

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
    .then((univ)=>{
        //res.json(univ);
        res.send(univ.students)
    });
});

router.post('/',function(req,res){
  var Univ = new UnivModel();

  Univ.name = req.body.name;
  Univ.students = [];

  Univ.save(function(err) {
    if (err){
      res.send(err);
    } else {
      res.json({ message: 'Success!!' });
    }
  });
});

router.delete('/:id', (req, res)=>{
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
