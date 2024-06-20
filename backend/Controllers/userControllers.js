const asyncHandler = require('express-async-handler')
const User = require('../Models/UserModel');
const router = require('../Routes/userRoute');
const genarateToken = require('../Config/genarateToken')


const registerUser =asyncHandler (async ()=>{
    const {name,email,password,picture} =req.body;
    console.log("=====================",name);

    if (!name || !email || !password || !picture) {
        res.status(400);
        throw new Error("plaese enter all fields ");
    }

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400);
        throw new Error("User already exist");
    }

    const user = await User.create({
        name,email,password,picture
    });

    if(user){
        res.status(201),json({
            _id:user._id,
            name :user.name,
            email : user.email,
            password : user.password,
            picture : user.picture,
            token : genarateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Failed create new user")
    }
})

const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body

    const user =  await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name :user.name,
            email : user.email,
            password : user.password,
            picture : user.picture,
            token : genarateToken(user._id)
        })
    }
})

module.exports = {registerUser,authUser}