const express=require('express');
const path=require('path');
const router=express.Router();
const connectdb=require('../util/database');
const User=require('../models/user');
const signup=require('../routes/signup');

router.get('/otpforgot',(req,res,next)=>{
    res.render('otpforgot',{title:'One Time Password'});
});
router.post('/otpsignup', async(req,res)=>{
    connectdb();
    try {
      const {otp} = req.body;
  
      const user = await User.findOne({otp});
      console.log({otp});
      if (!user) {
        return res.render('otpsignup', { title:"OTPSIGNUP",error: 'Invalid verification code.' });
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