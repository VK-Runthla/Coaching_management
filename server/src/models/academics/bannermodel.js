const { default: mongoose } = require("mongoose");

const bannermodel=new mongoose.Schema({
    Banner:{
        type:String
    }
})

const bannerschema=mongoose.model("bannerschemas",bannermodel)

module.exports=bannerschema