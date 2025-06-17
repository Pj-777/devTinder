require("dotenv").config();
const express = require('express');
const app = express();                         
const {connectDB} = require("./config/database.js");
const User= require("./models/user.js");

app.use(express.json());

app.post("/signup", async(req,res) => {
    const user=new User(req.body);
    try{
        await user.save();
        res.send("User added successfuly!");
    }
    catch(err){
        res.status(400).send("User not added!");
    }    
});

app.get("/user", async(req,res) => {
    const email = req.body.emailId;

  try{
       const user=await User.findOne({emailId:email});
       if(!user){
          res.status(404).send("User not found!");
       }
       else{
          res.send(user);
       } 
    }
    catch(err){
       res.status(400).send("Something went wrong!");
    }
});

app.get("/feed", async(req,res) =>{

    try{
        const user= await User.find({});
        if(user.length==0){
            res.status(404).send("User not found!");
        }
        else{
            res.send(user);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong!");
    }
});

app.delete("/delete", async(req,res) =>{
    const userId= req.body._id;
    try{
        const user= await User.findByIdAndDelete({_id:userId});
        if(!user){
            res.status(404).send("User not found!");   
        }
        else{
            res.send("User deleted successfully");   
        }
    }
    catch(err){
            res.status(400).send("Something went wrong!");
    }
});

app.patch("/update", async(req,res) => {
    const userId=req.body._id;
    const data=req.body;

    try{
        const ALLOWED_UPDATES=["_id","photoUrl","about","gender","age","skills"];
        const isUpdateAllowed= Object.keys(data).every((k) =>
        ALLOWED_UPDATES.includes(k) 
       );
        if(!isUpdateAllowed){
           throw new Error("Update not allowed!");
        }
        const user = await User.findByIdAndUpdate({_id:userId},data, {runValidators: true});
        console.log(user);
        res.send("User updated successfully!");
    } 
    catch(err){
        res.status(400).send(err.message);
    }
});

connectDB()
  .then(() => {
    console.log("Database connection successful!");
    app.listen(process.env.PORT, () => {                              
    console.log("Server successfuly listening on port 3000....");
    });
})
   .catch(err => {
    console.error("Database connection failed!");
});  