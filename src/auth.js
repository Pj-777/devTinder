const express = require('express');                       //importing the require from node_modules we are using express.js to create a server

const app = express();

const adminAuth = (req,res,next) => {                         //creating an authorization middleware    
    console.log("Admin auth is getting checked!");      

const token="xyz";
const isAdminAuthorized=(token=="xyz");                //checking whether the token is 'xyz' and then authorizes
    if(!isAdminAuthorized){
        res.status(404).send("Authentication failed!");
    }
   else{
        next();
    }

};
module.exports={adminAuth};
