const express=require('express');
const path=require('path');
const router=express.Router();


router.get("/forgot",(req,res,next)=>{
    res.render('forgot',{title:'Forgot Password'}); 
});

module.exports=router;