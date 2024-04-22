import userModel from "../../../../DB/model/userModel.js"
import cloudinary from "../../../utils/cloudinary.js"
import { compare, hash } from "../../../utils/security.js"

export const users = async(req, res) => {
    const user = await userModel.findById(req.user._id)
    res.json({message:'Done',user})
}
export const profileImg = async (req,res,next)=>{
    if (!req.file) {
        return next(new Error("Please Upload Image", { cause: 400 }));
    }
   const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`SARAHA/user/${req.user._id}/profile`})
   const user = await userModel.findByIdAndUpdate(req.user._id,{profileImg:{secure_url,public_id}},{new:true})
    res.json({message:'Done',user,file:req.file})
 }

export const profileCoverImg = async (req,res,next)=>{
    if (!req.files?.length) {
        return next(new Error("Please Upload Image", { cause: 400 }));
    }
    const coverImage = []
    for (const file of req.files) {
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:`SARAHA/user/${req.user._id}/profile/cover`})
        
        coverImage.push({secure_url,public_id})
    }
     const user =  await userModel.findByIdAndUpdate(req.user._id,{coverImage},{new:true})
     res.json({message:'Done',user,file:req.files})
 }

 export const updatePassword =async (req,res,next)=>{
    const {oldPassword,newPassword} = req.body
 
    const user = await userModel.findById(req.user._id)
   
    const match = compare({plainText:oldPassword,hashValue:user.password})
 
    if (!match) {
        return next(new Error('In-Valid Old Password',{cause:400}))
    }
    user.password =  hash({plainText:newPassword})
    await user.save()
    return res.status(200).json({message:'Done'})
 }
