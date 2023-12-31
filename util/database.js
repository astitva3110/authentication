const mongodb=require('mongodb');
const { Schema, model } = require('mongoose');
const MongoClient=mongodb.MongoClient;
const mongoose=require('mongoose');




 mongoose.connect('mongodb+srv://astitvarai3110:85pW7mOrc9Nlu1up@cluster0.9vz1igv.mongodb.net/?retryWrites=true&w=majority')
// mongoose.connect('mongodb://localhost:27017')
.then(result=>{
    console.log("connected to the database")
})
.catch(err=>{
    console.log(err)
});
const logindetailschema=new mongoose.Schema({
    user:String,
    email:String,
    password:String
});
const logindetail=new mongoose.model("logindetail",logindetailschema);


module.exports=logindetail;