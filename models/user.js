const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    user:{type:String, required:true},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  otp: { type: String , required:true},
  verified: { type: Boolean, default: false },
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
