const mongoose = require('mongoose');
//  const URI = "mongodb://127.0.0.1:27017/ticket";
const URI =
 process.env.MONGODB_URI;
const connectDb=async()=>{
    try{
        await mongoose.connect(URI);
        console.log("connection succesfull to db");
    }
    catch(error){
        console.error(error);
        process.exit(0);
    }
}

module.exports=connectDb;
