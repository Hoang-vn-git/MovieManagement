const mongoose = require('mongoose')

let movieSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    year:{
        type:Number,
        require:true
    },
    rating: {
        type: Number,
        require:true
    },
    genres: {
        type: [],
        require:true
    },
    description:{
        type:String,
        require:true
    }
})

let Movie = module.exports = mongoose.model("Movie", movieSchema)