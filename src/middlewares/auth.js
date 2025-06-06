const adminAuth = (req,res,next) => {                          //creating an authorization middleware    
    console.log("Admin auth is getting checked!");      

const token="xyz";
const isAdminAuthorized=(token=="xyz");                      //checking whether the token is 'xyz' and then authorizes
    if(!isAdminAuthorized){
        res.status(404).send("Authentication failed!");
    }
   else{
        next();
    }
};

module.exports={adminAuth};