const express = require("express");
const authRouter= express.Router();
const {validateSignUpData}= require("../utils/validation.js");
const User= require("../models/user.js");
const validator= require("validator");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const cookieParser = require("cookie-parser");
authRouter.use(cookieParser());

authRouter.post("/signup", async(req,res) =>{

    try{
        const {firstName,lastName,emailId,password}=req.body;
        validateSignUpData(req);
        const passwordHash= await bcrypt.hash(password,10);
        const user= new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash
            },
        );
        await user.save();
        res.send("User added successfuly!");
        }   
        catch(err){
            res.status(400).send("ERROR: " + err.message);
        }    
});

authRouter.post("/login", async(req,res) => {

    try{
        const{emailId,password}= req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("Please enter a valid emailId!");
        }
        else if(!validator.isStrongPassword(password)){
            throw new Error("Please enter a valid password!");
        }

        const user= await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials!");       
        }
        const isPasswordValid= await bcrypt.compare(password, user.password);
        if(!isPasswordValid){ 
            throw new Error("Invalid credentials!"); 
        }
        else{
            const token= await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"1d"});
            res.cookie("token",token);
            res.send("Login Successfull!");   
        }  
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

authRouter.post("/logout", async(req,res) => {
    res.cookie("token",null,{ 
    expires: new Date(Date.now()) 
});
    res.send("Logout successful!");
});

module.exports= {authRouter};