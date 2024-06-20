const asyncHandler = require('express-async-handler')
const User = require('../Models/UserModel');
const router = require('../Routes/userRoute');
const genarateToken = require('../Config/genarateToken')


const registerUser =asyncHandler (async (req,res)=>{
    const {name,email,password,picture} =req.body;


    if (!name || !email || !password || !picture) {
        res.status(400);
        throw new Error("plaese enter all fields");
    }

    const userExist = await User.findOne({email});
    
    if(userExist){
        res.status(400);
        throw new Error("User already exist");
    }

    const user = await User.create({
        name,email,password,picture
    });

    if(user){
        res.status(201).json({
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
    console.log("XXXXXXXXXXXXXX=====Coming Here======XXXXXXXXXXXXXXXX");
    const {email,password} = req.body
    console.log("+++++++++++++++++++++++++++++++",req.body);

    const user =  await User.findOne({email});
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx"+user);
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            password : user.password,
            // token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})

module.exports = {registerUser,authUser}