const express = require('express');                         //importing the require from node_modules we are using express.js to create a server

const app = express();

const {adminAuth}= require("./middlewares/auth.js");

app.use("/admin",adminAuth);

app.get("/user", (req,res) => {

    res.send("User data sent!");

});

app.get("/admin/getAlldata",(req,res) => {

    res.send("All data sent!");

});

app.get("/admin/deleteUserdata", (req,res) => {

    res.send("User data deleted!");

});

app.listen(3000, () => {                              //callback as "Server listening to the port 3000...."

    console.log("Server successfuly listening on port 3000....");

});
