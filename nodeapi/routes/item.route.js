const express = require('express');  
const app = express();  
const itemRoutes = express.Router();  
// Require Item model in our routes module  
let Item = require('../models/Item');  
let Product = require('../models/Product'); 

// Get Products and Items Combine  
itemRoutes.route('/getNoModel').get(function (req, res) {  
  let results = {"status":null,"products":[], "items":[]};
   console.log(" Inside method without model association");

  });  
   

// Get Products and Items Combine  
itemRoutes.route('/getConcurrent').get(function (req, res) {  
  let results = {"status":null,"products":[], "items":[]};
   
  const prodResult = Product.find(function (err, products){  
     console.log('Inside Products function');  
        if( err){  
          console.log(err);  
        }else{
          resolve({products}); 
        } 
  });  
  
   const itemsResult = new Promise (resolve =>{Item.find(function (err, items){  
    console.log('Inside the getItems function');  
        if( err ){  
          console.log(err);  
        }else {  
          resolve({items}); 
        }      
      })
    }); 
  
  Promise.all(prodResult,itemsResult)
  .then(results1 => console.log(results1))
  .catch(err => console.log(err));
  //itemsResult.then(items.forEach(item => results.items.push(item)));
  results.status = "Success";
  res.json(results);

 }); 
// Get Products and Items Combine  
itemRoutes.route('/getProdnItems').get(function (req, res) {  
  let results = {"status":null,"products":[], "items":[]};
   Product.find(function (err, products){  
     console.log('Inside Products function');  
     if( err){  
      console.log(err);  
     }else{
      products.forEach(product => results.products.push(product));
     } 
   }); 
   
   Item.find(function (err, items){  
    console.log('Inside the getItems function');  
    if( err ){  
     console.log(err);  
    }else {  
      items.forEach(item => results.items.push(item));
      results.status = "Success";
      res.json(results);
    }      
  }); 

 }); 
// Defined get data(index or listing) route  
itemRoutes.route('/product/getProducts').get(function (req, res) {  
  let results = {"itemone":null,"products":[], "items":[]};
   var prodResut =[];
   var itemResut;
   Product.find(function (err, prodResut){  
      if( err){  
      console.log(err);  
     }else{
       Item.find(function (err, items){  
          if( err ){  
          console.log(err);  
         }else {  
           items.forEach(item => prodResut.push(item));
           console.log('Just before sending Response');  
           res.json(prodResut);
         }      
       }); 
     } 
   });  
 }); 
// Defined store route  
itemRoutes.route('/addItem').post(function (req, res) {  
  let item = new Item(req.body);  
  product.save()  
    .then(item => {  
      res.status(200).json({'Item': 'Item has been added successfully'});  
    })  
    .catch(err => {  
    res.status(400).send("unable to save to database");  
    });  
});  
// Defined get data(index or listing) route  
itemRoutes.route('/getItems').get(function (req, res) {  
  Item.find(function (err, items){  
    console.log('Inside the getItems function');  
    if(err){  
      console.log(err);  
    }  
    else {  
      res.json(items);  
    }  
  });  
});  

// Defined get data(index or listing) route  
itemRoutes.route('/getItem').get(function (req, res) {  
  Item.find(function (err, items){  
    if(err){  
      console.log(err);  
    }  
    else {  
      res.json(items);  
    }  
  });  
});
// Defined edit itemroute  
itemRoutes.route('/editItem/:id').get(function (req, res) {  
  let id = req.params.id;  
  Item.findById(id, function (err, item){  
      res.json(item);  
  });  
});  
//  Defined update route  
itemRoutes.route('/updateItem/:id').post(function (req, res) {  
  Item.findById(req.params.id, function(err, item) {  
    if (!item)  
      res.status(404).send("Record not found");  
    else {  
      item.ItemName = req.body.ItemName;  
      item.ItemDescription = req.body.ItemDescription;  
      item.ItemPrice = req.body.ItemPrice;  
 item.save().then(item => {  
          res.json('Update complete');  
      })  
      .catch(err => {  
            res.status(400).send("unable to update the database");  
      });  
    }  
  });  
});  
// Defined delete | remove | destroy route  
itemRoutes.route('/deleteItem/:id').get(function (req, res) {  
    Item.findByIdAndRemove({_id: req.params.id}, function(err, item){  
        if(err) res.json(err);  
        else res.json('Successfully removed');  
    });  
});  
module.exports = itemRoutes;  