const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "devpdhana"

const signupUser = async(req,res,next)=>{
    const {name,email,password} = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (err) {
        console.log(err)
    }

    if(existingUser){
        res.status(200).json({message:"User already exists please login"})
    }

    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name,email,password:hashedPassword
    })

    try{
        await user.save()
        res.status(200).json(user)
    }catch(err){
        console.log(err);
    }
}

const loginUser = async(req,res,next)=>{
    const {email,password} = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (err) {
        console.log(err)
    }
    if (!existingUser){
        res.status(404).json({message:"User not found"})
    }
    const isCorrectpassword = bcrypt.compareSync(password,existingUser.password)
    if(!isCorrectpassword){
        res.status(400).json({message:"Email / Password incorrect"})
    }
    const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'35s'})


    if(req.cookies[`${existingUser._id}`]){
        req.cookies[`${existingUser._id}`] = ""
    }

    res.cookie(String(existingUser._id),token,{
        path:'/',
        expires: new Date(Date.now() + 1000 * 30),//30 Seconds
        httpOnly:true,
        sameSite:'lax'
    })
    res.status(200).json({message:"Successfully logged in...",user:existingUser,token})
}

const verifyToken = async(req,res,next)=>{
  const cookie = req.headers.cookie;
  const token = cookie.split("=")[1];

  // const headers = req.headers['authorization']
  // const token = headers.split(' ')[1]

  if (!token) {
    res.status(404).json({ message: "Token not found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      res.status(400).json({ message: "Invalid token" });
    }
    req.id = user.id;
  });
  next();
}

const getUser = async(req,res,next)=>{
    const userId = req.id
    let user;
    try{
        user = await User.findById(userId,"-password")
    }catch(err){
        console.log(err)
    }
    if(!user){
        res.status(404).json({message:"User not found"})
    }
    res.status(200).json({user})
    next()
}

const refreshToken = async(req,res,next)=>{
    const cookie = req.headers.cookie
    const prevToken = cookie.split("=")[1]
    if(!prevToken){
        res.status(400).json({message:"couldn't find token"})
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        res.status(403).json({ message: "Authentication failed" });
      }

      //remove cookie becase cookie contains a token
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";

      //New token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "35s",
      });

      //New cookie
      res.cookie(String(user.id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30), // 30seconds
        httpOnly: true,
        sameSite: 'lax',
      });

      req.id = user.id;
      next();
    });
}

const logOut = async(req,res,next) =>{

    const cookie = req.headers.cookie
    const prevToken = cookie.split("=")[1]
    if(!prevToken){
        res.status(400).json({message:"couldn't find token"})
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        res.status(403).json({ message: "Authentication failed" });
      }

      //remove cookie becase cookie contains a token
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";

      res.status(200).json({message:"Sucessfully Logged out"})

    })

}

exports.logOut = logOut
exports.signupUser = signupUser
exports.loginUser = loginUser
exports.verifyToken = verifyToken
exports.getUser = getUser
exports.refreshToken = refreshToken