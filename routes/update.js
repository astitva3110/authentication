const express=require('express');
const path=require('path');
const router=express.Router();


router.get("/update",(req,res)=>{
    res.render('update',{title:'Update Password'});
});
router.post('/update', async (req, res) => {
    connectdb();
    try {
    const { newPassword, confirmPassword } = req.body;
        const email = req.session.email;

    if (newPassword !== confirmPassword) {
            return res.render('update', { error: 'Passwords do not match.' });
     }

     const user = await User.findOne({ email });
    if (!user) {
            return res.render('update', { error: 'User not found.' });
        }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.render('signin', { title: 'signin' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports=router;