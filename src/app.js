const express = require('express');                         //importing the require from node_modules we are using express.js to create a server

const app = express();

app.get("/",(req,res) => {

    res.send("Welcome to the Dashboard!");

});

app.get("/user1", (req,res) => {                                  //Add an API like "/test" 

    console.log(req.query);
    res.send({firstname: "Priyanshu", lastname: "Jha"});        //response as "Hello from the server!" using command express.use
    console.log("Hello World");

});

app.get("/user2/:userId/:name",(req,res) => {

    console.log(req.params);
    res.send({firstname: "Priyanshu", lastname: "Jha"});

});

app.get("/hello", (req,res) => {                            //Add an API like "/test" 

    res.send("Hello from the server!");                    //response as "Hello from the server!" using command express.use

});

app.get("/test", (req,res) => {                          //Add an API like "/test"        

    res.send("Testing the server!");                    //response as "Testing the server!" using command express.use

});

app.delete("/user1", (req,res) => {
    
    res.send("User data deleted successfuly!");

}); 

app.get(
    "/user",
    (req,res,next) => {
       console.log("Handling route user 1!!");                    
       next();
       res.send("1st response!!");
       
    },

    (req,res,next) => {
       console.log("Handling route user 2!!");
       //res.send("2nd response!!");
       next();
    },                                                                    
    
    (req,res,next) => {                                           //These functions in the middle are called 'middlewares'                      
       console.log("Handling route user 3!!");                     
       //res.send("3rd response!!");
       next();
    },
    
    (req,res,next) => {
       console.log("Handling route user 4!!");
       //res.send("4th response!!");
       next();
    },

    (req,res,next) => {
       console.log("Handling route user 5!!");             //This is route handler whcih actually handles the requests
       //res.send("5th response!!");
    },
    
);

app.listen(3000, () => {                              //callback as "Server listening to the port 3000...."

    console.log("Server successfuly listening on port 3000....");

});
