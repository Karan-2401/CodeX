const mongoose = require('mongoose')
const Userschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImage:{
        type:String,
        default:""
    },
    clerkId:{
        type:String,
        required:true,
        unique:true,
    }
},{timestamps:true});

const User = mongoose.model("User",Userschema);
module.exports = User;