const mongoose = require('mongoose');  
const Schema = mongoose.Schema;  
// Define collection and schema for Result  
let Result = new Schema({  
  Name: {  
    type: String  
  },  
  Description: {  
    type: String  
  },  
  Links: {  
    type: String  
  }  
},{  
    collection: 'Result'  
});  
module.exports = mongoose.model('Result', Result);  