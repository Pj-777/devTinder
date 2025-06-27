require("dotenv").config();  
const express= require("express");  
const app= express();          
const {connectDB} = require("./config/database.js");
app.use(express.json());

const {authRouter}= require("./routes/auth.js");
const {profileRouter}= require("./routes/profile.js");
const {requestRouter}= require("./routes/request.js");
const {userRouter}= require("./routes/user.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

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