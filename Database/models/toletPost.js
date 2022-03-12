const bcrypt = require('bcryptjs');
const { json } = require('express/lib/response');
const mongoose=require('mongoose');

const ToletPost=  mongoose.Schema({
   
    houseName:{
        type:String,
        required: true
    },
    streetAddress:{
        type:String,
        required:true,
        // unique:true
    },
    
    contactNumber:{
        type:Number,
        required:true,
        // unique:true
    },
    division: {
       type:JSON,
       enum:['Dhaka','Chittagong','Sylhet','Khulna','Barishal','Rajshahi','Rajshahi','Mymensingh'],
       required:true
       
    },
    district:{
        type:JSON,
        enum:[],
        required:true
    },
    city:{
        type:JSON,
        enum:[],
        required:true
    },
    zip:{
        type:Number,
      
        required:true
     },
     fare:{
        type:String,
      
        required:true
     },
    rent_type:{
        type:JSON,
        enum:['To-Let','To-Let'],
        required:true
    },
    bath:{
        type:JSON,
        enum:['1','2','3'],
        required:true
    },
    bed:{
        type:JSON,
        enum:['1','2','3','4','5'],
        required:true
    },
    Picture:{
        type:String,
        required:true
    }        
   
});






const ToLet= new mongoose.model('ToLet',ToletPost);


module.exports = ToLet;