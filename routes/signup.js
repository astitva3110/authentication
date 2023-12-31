const express=require('express');
const path=require('path');
const router=express.Router();
const logindetail=require('../util/database');

router.get("/signup",(req,res,next)=>{
    res.render('signup',{tittle:'Sign-up'});
});

router.post("/signup",async(req,res,next)=>{
    try{
      const {user,email,password}=res.body;
      const hass = await bcrypt.hass(password,10);
      const newlogindetail=new logindetail({
        user,
        email,
        password:hass,
      });
      await newlogindetail.save();
      console.log(res.body);
    }catch(err){
      console.log(err);
    }
});
module.exports=router;