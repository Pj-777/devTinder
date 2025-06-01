const express = require('express');                              //importing the require from node_modules we are using express.js to create a server

const app = express();


app.get("/",(req,res) => {

    res.send("Welcome to the Dashboard!");

});

app.get("/user", (req,res) => {                                //Add an API like "/test" 

    res.send({firstname: "Priyanshu", lastname: "Jha"});      //response as "Hello from the server!" using command express.use

});

app.get("/hello", (req,res) => {                            //Add an API like "/test" 

    res.send("Hello from the server!");                    //response as "Hello from the server!" using command express.use

});

app.get("/test", (req,res) => {                          //Add an API like "/test"        

    res.send("Testing the server!");                    //response as "Testing the server!" using command express.use

});

app.delete("/user", (req,res) => {
    
    res.send("User data deleted successfuly!");

}); 

app.listen(3000, () => {                              //callback as "Server listening to the port 3000...."

    console.log("Server successfuly listening on port 3000....");

});

//Use app.get instead of app.use or we can just change the order of routes
