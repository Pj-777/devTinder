const express= require("express");
const requestRouter= express.Router();
const {userAuth}= require("../middlewares/auth.js");

requestRouter.post("/sendConnectionRequest", userAuth, async(req,res) =>{

    try{
        const user= req.user;
        console.log("Sending connection request....");
        res.send(user.firstName + " sent the connection!");
   }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports= {requestRouter};
