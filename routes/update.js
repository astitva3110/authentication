const express=require('express');
const path=require('path');
const router=express.Router();


router.get("/update",(req,res)=>{
    res.render('update',{title:'Update Password'});
});

module.exports=router;