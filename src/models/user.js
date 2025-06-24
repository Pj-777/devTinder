const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    lastName:{
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,

        validate(value){
            if(!validator.isEmail(value)){
                throw  new Error("Invalid email address");
            }
        }
    },
    password:{
        type: String,
        required: true,

        validate(value){
            if(!validator.isStrongPassword(value)){
                throw  new Error("Enter a stong password");
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum: {
            values: ["Male","Female","Others"],
            message: 'Invalid gender type'
        },
    },
    photoUrl: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
    },
    about:{
        type: String,
        default: "This is a default about of the user"
    },
    skills: {
        type: [String]
    }

},
    {
        timestamps: true
    }
);

userSchema.index({firstName: 1, lastName: 1});

module.exports= mongoose.model("User", userSchema);