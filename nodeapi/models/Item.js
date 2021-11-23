const mongoose = require('mongoose');  
const Schema = mongoose.Schema;  
// Define collection and schema for Product  
let Item = new Schema({  
  ItemName: {  
    type: String  
  },  
  ItemDescription: {  
    type: String  
  },  
  ItemPrice: {  
    type: Number  
  }  
},{  
    collection: 'Item'  
});  
module.exports = mongoose.model('Item', Item);  