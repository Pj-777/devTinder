const validator =require("validator");

const validateSignUpData= (req) =>{
    const {firstName,lastName,emailId,password}= req.body;

    if(!firstName || !lastName){
        throw new Error("Invalid name!");
    }
    else if (!validator.isEmail(emailId)){
        throw new Error("Invalid emailId!");
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!");
    }
}

const validateEditProfileData= (req) =>{
    const allowedEditFields= ["firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "age",
    "gender",
    "about",
    "skills"];

    const isallowedEditFields= Object.keys(req.body).every((keys) => allowedEditFields.includes(keys));
    return isallowedEditFields;
}

module.exports ={validateSignUpData,validateEditProfileData};