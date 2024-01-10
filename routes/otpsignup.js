const express=require('express');
const path=require('path');
const router=express.Router();
const connectdb=require('../util/database');
const User=require('../models/user');
const signup=require('../routes/signup');

router.get('/otpsignup',(req,res,next)=>{
  const { email } = req.session;
  
    res.render('otpsignup',{title:'One Time Password',email});
});

router.post('/otpsignup', async(req,res)=>{
    connectdb();
    try {
      const {email ,otp} = req.body;
  
      const user = await User.findOne({email,otp});
      console.log({email,otp});
      if (!user) {
        return res.render('otpsignup', { title:"OTPSIGNUP" ,email, error: 'Invalid verification code.' });
      }
  
      user.verified = true;
      await user.save();
  
      res.redirect('/signin');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports=router;