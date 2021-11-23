const express = require('express');  
const app = express();  
const resultRoutes = express.Router();  
// Require result model in our routes module  
let Result = require('../models/Result');  
// Defined store route  
resultRoutes.route('/addResult').post(function (req, res) {  
  let result = new Result(req.body);  
  result.save()  
    .then(result1 => {  
      res.status(200).json({'Result': 'Result has been added successfully'});  
    })  
    .catch(err => {  
    res.status(400).send("unable to save to database");  
    });  
});  
// Defined get data(index or listing) route  
resultRoutes.route('/').get(function (req, res) {  
  Result.find(function (err, results){  
    if(err){  
      console.log(err);  
    }  
    else {  
      res.json(results);  
    }  
  });  
});  

// Defined get data(index or listing) route  
resultRoutes.route('/:id').get(function (req, res) {  
  Result.findOne(function (err, result){  
    if(err){  
      console.log("ERROR EHIL CALLING PAGE ..");  
      console.log(err);  
    }  
    else {  
      res.json(result);  
    }  
  });  
});  
// Defined edit route  
resultRoutes.route('/search/:text').get(function (req, res) {  
  let txt = req.params.text;  
 // console.log("  Text :-   " + txt);
  let query = { $or : [{ "Name": txt}, { "Description": txt}, { "Links": txt}] };
  //console.log("  search Sting  :-   " + JSON.stringify(query));
  Result.find(query, function (err, results){  
 //   console.log("  results  :-   " + JSON.stringify(results));
    res.json(results);
   });  
 
}); 

// Defined edit route  
resultRoutes.route('/edit/:id').get(function (req, res) {  
  let id = req.params.id;  
  Result.findById(id, function (err, result){  
      res.json(result);  
  });  
});  
//  Defined update route  
resultRoutes.route('/update/:id').post(function (req, res) {  
  Result.findById(req.params.id, function(err, result1) {  
    if (!result1)  
      res.status(404).send("Record not found");  
    else {  
      result1.Name = req.body.Name;  
      result1.Description = req.body.Description;  
      result1.Links = req.body.Links;  
      result1.save().then(result1 => {  
          res.json('Update complete');  
      })  
      .catch(err1 => {  
            res.status(400).send("unable to update the database");  
      });  
    }  
  });  
});  
// Defined delete | remove | destroy route  
resultRoutes.route('/delete/:id').get(function (req, res) {  
  Result.findByIdAndRemove({_id: req.params.id}, function(err, result){  
        if(err) res.json(err);  
        else res.json('Successfully removed');  
    });  
});  
module.exports = resultRoutes;  