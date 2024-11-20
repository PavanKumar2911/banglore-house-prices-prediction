const User= require("../model/user_model")

// const name=contact.name;
// const mail=contact.mail;
const getAllProducts = async(req,res)=>{
    
    const data = await User.find();
    res.status(200).json({ data});
    
}
module.exports=getAllProducts