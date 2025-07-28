const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    email: {
        type:String,
        require:true
    },
    password : {
        type:String,
        require:true
    },
    role:{
        type:Number,
        require:true
    }

})

let User = module.exports = mongoose.model('users', userSchema)