const express=require('express');
const path=require('path');
const router=express.Router();
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt');
const connectdb=require('../util/database');
const User=require('../models/user')
const env =require('dotenv').config();

router.get("/signup",(req,res,next)=>{
  res.render('signup',{tittle:'Sign-up'});
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'astitvakumarrai3110@gmail.com',
    pass: 'dynuwikseuumiaei',
  },
});

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
router.post('/signup', async (req, res) => {
  connectdb();
  try {
    console.log(req.body)
    const { user,email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.render('signup', { error: 'Email is already registered.' });
    }
    const hass = await bcrypt.hash(password, 10);
    req.session.email = email;
    const otp = generateVerificationCode();
    const newUser = new User({ user,email, password:hass ,otp});
    await newUser.save();
    const mailOptions = {
      from: 'astitvakumarrai3110@gmail.com',
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

    res.render('otpsignup',{ title:"OTP FOR SIGNUP"});
  }
   catch (error) {
    console.error(error);
    console.log(err);
  }

});
module.exports=router;