const express =require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const path=require('path');

const app=express();
const forgotrouter=require('./routes/forget');
const otpforgotrouter=require('./routes/otpforgot');
const otpsignuprouter=require('./routes/otpsignup');
const signuprouter=require('./routes/signup');
const updateroter =require('./routes/update');
const connectdb=require('./util/database');
const session =require('express-session');

app.set('view engine','ejs');
app.set('views','views');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(forgotrouter);
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(otpsignuprouter);
app.use(otpforgotrouter);
app.use(signuprouter);
app.use(updateroter);
 
connectdb();

app.get("/",(req,res,next)=>{
    res.render('signin',{title:'Sign-in'});
});

app.use((req,res,next)=>{
  res.status(404).render('404',{title:'Error'});
})


app.listen(8080,function(){
  console.log("server is running on 8080 port");
}); 