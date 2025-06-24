const express= require("express");
const requestRouter= express.Router();
const {userAuth}= require("../middlewares/auth.js");
const User= require("../models/user.js");
const ConnectionRequest= require("../models/connectionRequest.js");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res) =>{

    try{
        const fromUserId= req.user._id;
        const toUserId= req.params.toUserId;
        const status= req.params.status;

        const allowedStatus= ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message: 'Invalid status type'
            });  
        }
        const user= await User.findById(toUserId);
        if(!user){
            return res.status(404).send(
                {message: "User not found!"}
            );
        }
        else if(fromUserId==toUserId){
            return res.status(400).send(
                {message: "Invalid request!"}
            );
        }
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
        });
        if(existingConnectionRequest){
            return res.status(400).send({
                message:'Connection request already exists'
            });
        }    
        const connectionRequest= new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        
        const data= await connectionRequest.save();
        res.json({
            message: status,
            data,
        });
   }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }    
});

module.exports= {requestRouter};