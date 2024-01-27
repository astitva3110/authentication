const mongodb=require('mongodb');
const { Schema, model } = require('mongoose');
const MongoClient=mongodb.MongoClient;
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
require('dotenv').config();

const connectdb=async()=>{

 mongoose.connect(process.env.mongo)

.then(result=>{
    console.log("connected to the database")
})
.catch(err=>{
    console.log(err)
});
}
// const logindetailschema=new mongoose.Schema({
//     user:String,
//     email:String,
//     password:String
// });
// const logindetail=new mongoose.model("logindetail",logindetailschema);


module.exports=connectdb;