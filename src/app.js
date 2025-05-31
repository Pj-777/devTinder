const express = require('express');                           //importing the require from node_modules we are using express.js to create a server

const app = express();

app.use("/hello",(req,res) => {                             //Add an API like "/test" 

    res.send("Hello from the server!");                       //response as "Hello from the server!" using command express.use

});

app.use("/test",(req,res) => {                           //Add an API like "/test"        

    res.send("Testing the server!");                    //response as "Testing the server!" using command express.use

});

app.listen(3000, () => {                              //callback as "Server listening to the port 3000...."

    console.log("Server successfuly listening on port 3000....");

});

