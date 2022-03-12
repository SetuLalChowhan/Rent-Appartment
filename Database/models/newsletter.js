const mongoose=require('mongoose');

const Letter=  mongoose.Schema({
    TextArea:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   

});


const NewsLetter= new mongoose.model('NewsLetter',Letter);


module.exports = NewsLetter;