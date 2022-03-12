const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/RentAppartment',{
    useNewUrlParser:true,
    useUniFiedTopology:true,
}).then(()=>{
    console.log("Connect")
}).catch((e)=>{
    console.log("Error")
})


