const express=require('express');
const path=require('path');
const router=express.Router();


router.get('/otpforgot',(req,res,next)=>{
    res.render('otpforgot',{title:'One Time Password'});
});

module.exports=router;