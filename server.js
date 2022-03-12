const express= require("express");
const app=express();
const path= require('path');
const bcrypt=require("bcryptjs");
const multer=require ('multer');

require('./Database/connection/conn');
const SignUp= require('./Database/models/singup');
const NewsLetter= require("./Database/models/newsletter");
const ToLet= require('./Database/models/toletPost');
const req = require("express/lib/request");

const PORT= process.env.PORT || 3000

app.set('view engine','ejs');

app.use(express.static('public'));

app.use('/css',express.static(__dirname + 'public/css'));
app.use('/image',express.static(__dirname + 'public/image'));
app.use('/js',express.static(__dirname + 'public/Javascript'));

// page directory setup 
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/login',(req,res)=>{
    res.render('Login');
})
app.get('/signup',(req,res)=>{
    res.render('Signup');
})
app.get('/dashboard',(req,res)=>{
    res.render('Dashboard');
})
app.get('/aboutus',(req,res)=>{
    res.render('AboutUs');
})
app.get('/tolet',(req,res)=>{
    res.render('ToLet');
})
app.get('/appartments',(req,res)=>{
    res.render('Appartments');
})
app.get('/update',(req,res)=>{
    res.render('Update');
})


//signUP values to database
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/signup',async(req,res)=>{
    try{
        const password=req.body.password;
        const confirm=req.body.rePassword;

        if(password===confirm)
        {
            const store= new SignUp({
                name:req.body.name,
                email:req.body.email,
                contact:req.body.contact,
                password:req.body.password,
                rePassword:req.body.rePassword
            })

            const FinalStore= await store.save();

            res.status(201).render('index');
        }
        else{
            res.status(404).send('Please enter same password');
        }

    }catch(e)
    {
         res.send(e);
    }
});
app.post('/',async(req,res)=>{
    try{
        const email=req.body.email;
       const userEmail= await SignUp.findOne({email:email});

        if(email===userEmail.email)
        {
            const storeLetter= new NewsLetter({
                email:req.body.email,
                TextArea:req.body.TextArea,
         
            })
            

            const FinalStoreLetter= storeLetter.save();

            res.status(201).render('index');
        }
        else{
            res.status(404).send('Please Register First!');
        }

    }catch(error)
    {
        res.status(404).send('Please Register First!');
    }
});

//login Varification


app.post('/login',async(req,res)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;
    
    const userEmail= await SignUp.findOne({email:email});

    // hash password matching here 
    const isMatch = await bcrypt.compare(password, userEmail.password);
    if(!isMatch){
        
        res.render('Login');

    }
    else{
        res.render( `ToLet`)
          
    }
}catch(error){
    res.status(404).render(`Login`)
    
}

});

// image upload 
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads' )
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    }
});
const upload=multer({
    storage:storage,
}).single('Picture');
//Tolet
app.post("/tolet",upload,(req,res)=>{
    const toletPost = new ToLet ({
        houseName:req.body.houseName,
        streetAddress:req.body.streetAddress,
        contactNumber:req.body.contactNumber,
        division:req.body.division,
        district:req.body.district,
        city:req.body.city,
        zip:req.body.zip,
        fare:req.body.fare,
        rent_type:req.body.rent_type,
        bath:req.body.bath,
        bed:req.body.bed,
        Picture:req.file.filename

    });
    toletPost.save((err)=>{
        if(err){
            console.log("error!");
        }else{
            res.render(`Dashboard`);

        }
    })
});


// app.post('/tolet', upload, (req,res)=>{
   
//     const toletPost= new ToLet(
//         houseName:req.body.houseName,
//         streetAddress:req.body.streetAddress,
//         contactNumber:req.body.contactNumber,
//         division:req.body.division,
//         district:req.body.district,
//         city:req.body.city,
//         zip:req.body.zip,
//         fare:req.body.fare,
//         rent_type:req.body.rent_type,
//         bath:req.body.bath,
//         bed:req.body.bed,
//         Picture:req.file.filenam
//     );
   
    
//     toletPost.save((err)=>{

//         if(!err)
//         res.render(`Dashboard`);
//         else{
//             console.log('Error!');
//         }
        
    
//     });

// });



//  news letter 
app.post('/',async(req,res)=>{
    try{
        const email=req.body.email;
       const userEmail= await SignUp.findOne({email:email});

        if(email===userEmail.email)
        {
            const storeLetter= new NewsLetter({
                email:req.body.email,
                TextArea:req.body.TextArea,
         
            })
            

            const FinalStoreLetter= storeLetter.save();

            res.status(201).render('index');
        }
        else{
            res.status(404).send('Please Register First!');
        }

    }catch(error)
    {
        res.status(404).send('Please Register First!');
    }
});



app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})