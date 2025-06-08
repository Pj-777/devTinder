const mongoose = require("mongoose");

const connectDB = async() =>{
    mongoose.connect("mongodb+srv://pj4739479:6svJGWiKD4L91TrI@namastenode.ozth2et.mongodb.net/devTinder");
}

module.exports = {connectDB};