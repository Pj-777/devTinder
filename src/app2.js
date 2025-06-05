const express = require('express');                       //importing the require from node_modules we are using express.js to create a server

const app = express();


app.use("/admin",(req,res) => {                         //creating an authorization middleware          

const token="xyz";
const isAdminAuthorized=(token=="xyz");                //checking whether the token is 'xyz' and then authorizes

    if(isAdminAuthorized){
        res.send("All data sent!");
    }
   else{
    res.status(404).send("Authentication failed!");
    }

});

app.listen(3000, () => {                                   //callback as "Server listening to the port 3000...."

    console.log("Server successfuly listening on port 3000....");

});
