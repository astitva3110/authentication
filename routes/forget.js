const express=require('express');
const path=require('path');
const router=express.Router();
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt');
const connectdb=require('../util/database');
const User=require('../models/user')
require('dotenv').config();

router.get("/forgot",(req,res,next)=>{
    res.render('forgot',{title:'Forgot Password'}); 
});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });
  
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };
  router.post('/forgot', async (req, res) => {
    connectdb();
    try {
      console.log(req.body)
      const {email} = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.render('forgot', { error: 'Email is not registered.' });
      }
      req.session.email = email;
      const otp = generateVerificationCode();
      user.otp=otp;
      user.verified=false;
      await user.save();
      const mailOptions = {
        from: process.env.user,
        to: email,
        subject: 'Email Verification',
        text: `Your verification code is: ${otp}`,
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
  
      res.render('otpforgot',{ title:"UPDATE PASSWORD"});
    }
     catch (error) {
      console.error(error);
      console.log(error);
    }
  
  });
module.exports=router;