const jwt= require("jsonwebtoken");
const User= require("../models/user.js");

const userAuth = async(req,res,next) =>{
                      
    try{
        const {token}= req.cookies;
        if(!token){
            throw new Error("Token not found!!!");
        }

        const DecodedData= await jwt.verify(token,"DEV@Tinder$790", {expiresIn:"1d"});
        const {_id}= DecodedData;
        const user= await User.findById({_id});

        if(!user){
            throw new Error("User not found!");
        }
        else{
            req.user= user;
            next();
        }
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
}

module.exports= {userAuth};