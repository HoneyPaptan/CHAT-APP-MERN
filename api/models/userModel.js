const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({    // creating a schema
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
      
    }
}, {timestamps: true})   // timestamps: true will create a createdAt and updatedAt field

const UserModel = mongoose.model("user", userSchema)  // creating a model
module.exports = UserModel