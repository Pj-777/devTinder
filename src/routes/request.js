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

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res) =>{
   
    try{
        const loggedInUser= req.user;
        const allowedStatus=["accepted","rejected"];
        const status= req.params.status;
        const requestId= req.params.requestId;

        if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid status!");
        }
        const connectionRequest= await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: 'interested',
        });
        if(!connectionRequest){
            return res.status(404).json({message: 'Connection request not found!'});
        }
        connectionRequest.status= status;
        const data= await connectionRequest.save();
        res.json({message: 'Connection request ' + status, data});
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports= {requestRouter};                