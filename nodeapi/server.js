const express0 = require('express'),  
    express2 = require('express'), 
    express4 = require('express'), 
    path = require('path'),  
    bodyParser = require('body-parser'),  
    cors = require('cors'),  
    mongoose = require('mongoose'),  
    config = require('./DB');  

const productRoute = require('./routes/product.route');  
    mongoose.Promise = global.Promise;  
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(  
      () => {console.log('Database is connected for Product') },  
      err => { console.log('Can not connect to the database'+ err)}  
    );  

const itemRoute = require('./routes/item.route');  
    mongoose.Promise = global.Promise;  
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(  
      () => {console.log('Database is connected For Item') },  
      err => { console.log('Can not connect to he database'+ err)}  
    );  

const resultRoute = require('./routes/result.route');  
    mongoose.Promise = global.Promise;  
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(  
      () => {console.log('Database is connected result') },  
      err => { console.log('Can not connect to he database'+ err)}  
    );  

const app = express0();  
    app.use(bodyParser.json());  
    app.use(cors());  
    app.use('/products', productRoute);  
    
const port0 = process.env.PORT || 4000;  
const server0 = app.listen(port0, function(){  
     console.log('Listening on port ' + port0);  
    });  

const app4002 = express2();  
    app4002.use(bodyParser.json());  
    app4002.use(cors());  
    app4002.use('/items', itemRoute); 
    
const port2 = process.env.PORT || 4002;  
const server2 = app4002.listen(port2, function(){  
     console.log('Listening on port ' + port2);  
    });  

const app4004 = express4();  
    app4004.use(bodyParser.json());  
    app4004.use(cors());  
    app4004.use('/results', resultRoute); 
    
const port4 = process.env.PORT || 4004;  
const server4 = app4004.listen(port4, function(){  
     console.log('Listening on port ' + port4);  
    });  