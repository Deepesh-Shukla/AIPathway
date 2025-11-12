import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken } from "../configs/token.js";
import sendMail from "../configs/Mail.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(404).json({ message: "User is already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter Valid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be of 8 character" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      // convert 7 days into miliseconds
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `SignUp error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      // convert 7 days into miliseconds
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Login error ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `LogOut error ${error}` });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    (user.resetOtp = otp), (user.otpExpires = Date.now() + 5 * 60 * 1000);
    user.isOtpVerified = false;

    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: `Otp send successfully` });
  } catch (error) {
    return res.status(500).json({ message: `Send otp error ${error}` });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(404).json({ message: "Invalid Otp" });
    }
    user.isOtpVerified = true;
    (user.resetOtp = undefined), (user.otpExpires = undefined);

    await user.save();
    return res.status(200).json({ message: `Otp verified successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Verify otp error ${error}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(404).json({ message: "Otp verification is required" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: `Password Reset Successfully` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Reset Password error ${error}` });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        role,
      });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      // convert 7 days into miliseconds
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `GoogleAuth error ${error}` });
  }
};

// import { genToken } from "../configs/token.js"
// import validator from "validator"

// import bcrypt from "bcryptjs"
// import User from "../models/userModel.js"

// import sendMail from "../configs/Mail.js"

// export const signup = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     let existUser = await User.findOne({ email });
//     if (existUser) {
//       return res.status(404).json({ message: "User is already exist" });
//     }
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ message: "Enter Valid email" });
//     }
//     if (password.length < 8) {
//       return res
//         .status(400)
//         .json({ message: "Password must be of 8 character" });
//     }
//     let hashPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       password: hashPassword,
//       role,
//     });
//     let token = await genToken(user._id);
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
//     return res.status(201).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: `SignUp error ${error}` });
//   }
// };

// export const login=async(req,res)=>{
//     try {
//         let {email,password}= req.body
//         let user= await User.findOne({email})
//         if(!user){
//             return res.status(400).json({message:"user does not exist"})
//         }
//         let isMatch =await bcrypt.compare(password, user.password)
//         if(!isMatch){
//             return res.status(400).json({message:"incorrect Password"})
//         }
//         let token =await genToken(user._id)
//         res.cookie("token",token,{
//             httpOnly:true,
//             secure:false,
//             sameSite: "lax",
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         })
//         return res.status(200).json(user)

//     } catch (error) {
//         console.log("login error")
//         return res.status(500).json({message:`login Error ${error}`})
//     }
// }

// export const logOut = async(req,res)=>{
//     try {
//         await res.clearCookie("token")
//         return res.status(200).json({message:"logOut Successfully"})
//     } catch (error) {
//         return res.status(500).json({message:`logout Error ${error}`})
//     }
// }

// export const googleAuth = async (req, res) => {
//   try {
//     const { name, email, role } = req.body;
//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         role,
//       });
//     }
//     let token = await genToken(user._id);
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "Strict",
//       // convert 7 days into miliseconds
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
//     return res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: `GoogleAuth error ${error}` });
//   }
// };

// export const sendOtp = async (req,res) => {
//     try {
//         const {email} = req.body
//         const user = await User.findOne({email})
//         if(!user){
//             return res.status(404).json({message:"User not found"})
//         }
//         const otp = Math.floor(1000 + Math.random() * 9000).toString()

//         user.resetOtp=otp,
//         user.otpExpires=Date.now() + 5*60*1000,
//         user.isOtpVerifed= false

//         await user.save()
//         await sendMail(email,otp)
//         return res.status(200).json({message:"Email Successfully send"})
//     } catch (error) {

//         return res.status(500).json({message:`send otp error ${error}`})

//     }
// }

// export const verifyOtp = async (req,res) => {
//     try {
//         const {email,otp} = req.body
//         const user = await User.findOne({email})
//         if(!user || user.resetOtp!=otp || user.otpExpires<Date.now() ){
//             return res.status(400).json({message:"Invalid OTP"})
//         }
//         user.isOtpVerifed=true
//         user.resetOtp=undefined
//         user.otpExpires=undefined
//         await user.save()
//         return res.status(200).json({message:"OTP varified "})

//     } catch (error) {
//          return res.status(500).json({message:`Varify otp error ${error}`})
//     }
// }

// export const resetPassword = async (req,res) => {
//     try {
//         const {email ,password } =  req.body
//          const user = await User.findOne({email})
//         if(!user || !user.isOtpVerifed ){
//             return res.status(404).json({message:"OTP verfication required"})
//         }

//         const hashPassword = await bcrypt.hash(password,10)
//         user.password = hashPassword
//         user.isOtpVerifed=false
//         await user.save()
//         return res.status(200).json({message:"Password Reset Successfully"})
//     } catch (error) {
//         return res.status(500).json({message:`Reset Password error ${error}`})
//     }
// }
