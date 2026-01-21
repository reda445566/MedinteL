const mongoose = require("mongoose");

const schema = schema.mongoose

const userschema = schema({

    name : String,
    age:Number,
    email:String,
    password:Number,
})

module.exports = mongoose.model("users", userschema)


