const express = require('express');                       //importing the require from node_modules we are using express.js to create a server

const app = express();


app.use("/admin",(req,res,next) => {                         //creating an authorization middleware    
    console.log("Admin auth is getting checked!");      

const token="xyz";
const isAdminAuthorized=(token=="xyz");                //checking whether the token is 'xyz' and then authorizes
    if(!isAdminAuthorized){
        res.status(404).send("Authentication failed!");
    }
   else{
        next();
    }

});

app.get("/admin/getAlldata",(req,res) => {

    res.send("All data sent!");

});

app.get("/admin/deleteUserdata", (req,res) => {

    res.send("User data deleted!");

});

app.listen(3000, () => {                                   //callback as "Server listening to the port 3000...."

    console.log("Server successfuly listening on port 3000....");

});
