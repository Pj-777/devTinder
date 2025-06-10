require("dotenv").config();
const express = require('express');
const app = express();                        //importing the require from node_modules we are using express.js to create a server
const {adminAuth}= require("./middlewares/auth.js");
const {connectDB} = require("./config/database.js");
const User= require("./models/user.js");


app.use("/admin",adminAuth);

app.get("/user", (req,res) => {
    //throw new Error("shgfe");
    res.send("User data sent!");      
});

app.use("/",(err,req,res,next) => {
    if(err){
        res.status(500).send("something went wrong");
    }
});

app.get("/admin/getAlldata",(req,res) => {
    res.send("All data sent!");
});

app.get("/admin/deleteUserdata", (req,res) => {
    res.send("User data deleted!");
});

app.post("/signup", async(req,res) => {

    //creating a new instance of the User model
    const user=new User( 
        {
        firstName: "Priyanshu",
        lastName: "Jha",
        emailId: "pj4739479@gmail.com",
        password: "pj@123",
        age: "21"
    }
);
    try{
    await user.save();
    res.send("User added successfuly!");
    }
    catch(err){
    res.status(400).send("User not added!")
    }    
});

connectDB()
  .then(() => {
    console.log("Database connection successful!");
    app.listen(process.env.PORT, () => {                              //callback as "Server listening to the port 3000...."
    console.log("Server successfuly listening on port 3000....");
    });
})
   .catch(err => {
    console.error("Database connection failed!");
    });   