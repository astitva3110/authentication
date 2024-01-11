const express =require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const path=require('path');
const bcrypt=require('bcrypt');

const forgotrouter=require('./routes/forget');
const otpforgotrouter=require('./routes/otpforgot');
const otpsignuprouter=require('./routes/otpsignup');
const signuprouter=require('./routes/signup');
const updateroter =require('./routes/update');
const connectdb=require('./util/database');
const session =require('express-session');
const User = require("./models/user");
const successrouter=require("./routes/success");
const { error } = require("console");
const app=express();
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(forgotrouter);
app.use(otpsignuprouter);
app.use(otpforgotrouter);
app.use(signuprouter);
app.use(updateroter);
app.use(successrouter);
 
connectdb();

app.get("/",(req,res,next)=>{
    res.render('signin',{title:'Sign-in'});
});
app.post("/",async(req,res)=>{
  connectdb();
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if((!user)){
       res.render('signin',{error: "User is not Found"});
       return
    }
    const ispass=await bcrypt.compare(password,user.password);
    if(!ispass){
      res.render('signin',{error:"Password is not match"});
      return
    }
    req.session.email = user.email;
    console.log('correct')
    res.redirect('/success');
  }
  catch{
    console.log(error);
    res.status(500).send('internal error');
  }
})

app.use((req,res,next)=>{
  res.status(404).render('404',{title:'Error'});
})


app.listen(8080,function(){
  console.log("server is running on 8080 port");
}); 