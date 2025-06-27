const express= require("express");
const userRouter= express.Router();
const {userAuth}= require("../middlewares/auth.js");
const User= require("../models/user.js");
const ConnectionRequest= require("../models/connectionRequest.js");

userRouter.get("/user/requests/received", userAuth, async(req,res) => {
    try{
        const loggedInUser= req.user;
        const connectionRequests= await ConnectionRequest.find({ 
            toUserId: loggedInUser._id,  
            status:'interested'                         
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about","skills"]);

        res.json({message:"Connection requests fetched successfully", data: connectionRequests});
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }    
});   

userRouter.get("/user/connections", userAuth, async(req,res)=> {
    try{
        const loggedInUser= req.user;
        const connectionRequests= await ConnectionRequest.find({ 
        $or: [
            {fromUserId: loggedInUser._id,status:'accepted'},
            {toUserId: loggedInUser,status:'accepted'},
        ]                    

        }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about","skills"])
        .populate("toUserId",["firstName","lastName","photoUrl","age","gender","about","skills"]);

        res.json({data: connectionRequests});
    }    
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/feed", userAuth, async(req,res) => {

    try{        
        const loggedInUser= req.user;
        const page= parseInt(req.query.page) || 1;
        let limit= parseInt(req.query.limit) || 10;
        limit = limit > 10 ? 10:limit;
        const skip= (page - 1)*limit;

        const connectionRequests= await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser},
            {toUserId:loggedInUser}
            ]                               
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId);
            hideUsersFromFeed.add(req.toUserId);
        });

        const users= await User.find({
            $and:[ {_id: { $nin: Array.from(hideUsersFromFeed)}}, 
                {_id: { $ne: loggedInUser._id}},
            ]   
        }).select(["firstName","lastName", "photoUrl","age","gender","about","skills"]).skip(skip).limit(limit);
        res.json({users});
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports= {userRouter};