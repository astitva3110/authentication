const express=require('express');
const path=require('path');
const router=express.Router();


router.get('/otpsignup',(req,res,next)=>{
    res.render('otpsignup',{title:'One Time Password'});
});

module.exports=router;