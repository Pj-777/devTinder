const express= require("express");
const profileRouter= express.Router();
const User= require("../models/user.js");
const {userAuth}= require("../middlewares/auth.js");
const {validateEditProfileData}= require("../utils/validation.js");

profileRouter.get("/profile/view", userAuth, async(req,res) => {

    try{
        const user= req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
}); 

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{

    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid request!!!");
        }
        else{
            const loggedInUser= req.user;
            Object.keys(req.body).forEach((key) => loggedInUser[key]= req.body[key]);
            await loggedInUser.save();
            res.send("Profile updated successfully");
        }
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
});

module.exports= {profileRouter}; 