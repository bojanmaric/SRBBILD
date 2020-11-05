const mongoose =require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type:String,
        default:''
    },
   
    admin:{
        type:String,
        default:''
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true});


const User = module.exports = mongoose.model('user', UserSchema);