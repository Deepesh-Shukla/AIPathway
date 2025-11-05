import jwt from "jsonwebtoken"
export const genToken= async(userId)=>{
try {
   let token= jwt.sign({userId} , process.env.JWT_SECRET, {expiresIn:"7d"})
   console.log("Generated Token:", token);
   return token
} catch (error) {
    console.log("token error")
    }
}