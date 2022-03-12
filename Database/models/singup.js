const bcrypt = require('bcryptjs');
const mongoose=require('mongoose');

const Register=  mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:Number,
        required:true,
        unique:true
    },
    password:
    {
       type:String,
       required:true
    },
    rePassword:{
        type:String,
        required:true
    }

});

Register.pre("save", async function(next){

    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.rePassword=await bcrypt.hash(this.rePassword,12);


    }
    
    next();

})


const SignUp= new mongoose.model('SignUp',Register);


module.exports = SignUp;