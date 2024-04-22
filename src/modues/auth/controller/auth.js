import userModel from "../../../../DB/model/userModel.js";
import { generateToken, verifyToken } from "../../../utils/jwt.js";
import { compare, hash } from "../../../utils/security.js";
import sendEmail from "../../../utils/sendEmail.js";


export const signUp =  async (req,res,next)=>{
        const {firstName,lastName,password,cPassword,email,userName} = req.body
       
        if(await userModel.findOne({email})){
            return next(new Error("Email already exists", { cause: 409 }));
        } 
        if(password!== cPassword){
            return next(new Error("Passwords do not match", { cause: 400 }));
        }
        const hashPassword = hash({plainText:password})
        const user = await userModel.create({firstName,lastName,email,userName,cPassword,password:hashPassword})
        const token = generateToken({payload:{email},signature:process.env.TOKEN_SIGNATURE,expiresIn:60*5})
        const reToken = generateToken({payload:{email},signature:process.env.TOKEN_SIGNATURE,expiresIn:60 * 60 * 24 * 30})
        const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
        const reLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${reToken}`
        const html =` <a href="${link}">Confirm Email</a>
        <br>
        <br>
        <br>
        <a href="${reLink}"> New Confirm Email</a>`
        await sendEmail({to:email,subject:"Confirm Email",html})
        return res.status(201).json({message:"Done", user})
    }
 
export const confirmEmail = async (req,res,next)=>{
    const {token} = req.params
    const decoded = verifyToken({token,signature:process.env.TOKEN_SIGNATURE})
    const user = await userModel.findByIdAndUpdate(decoded.id,{confirmEmail:true})
    // return user ? res.json({message:'done'}):next(new Error('Not Registered Account',{cause:404}))
    return user? res.redirect('https://signup.com/login/signin/') :
    res.send(`<a href='https://signup.com/login/signup/>u dont have account click here to signup</a>`)
}

export const newConfirmEmail = async (req,res,next)=>{
    const {token} = req.params
    const decoded = verifyToken({token,signature:process.env.TOKEN_SIGNATURE})
    const user = await userModel.findById(decoded.id)
    if (!user) {
        res.send(`<a href='https://signup.com/login/signup/>u dont have account click here to signup</a>`)
    }
    if (user.confirmEmail) {
        res.redirect('https://signup.com/login/signin/')   
    }
    const newToken = generateToken({payload:{email},signature:process.env.TOKEN_SIGNATURE,expiresIn:60 * 2})
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
    const html =` <a href="${link}">Confirm Email</a> `
    await sendEmail({to:email,subject:"Confirm Email",html})
    return res.send(`<p>Check ur inbox </p>`)
}

export const login =  async (req,res,next)=>{
        const {password,email} = req.body

        const user = await userModel.findOne({email})
        if(!user){
            return next(new Error("Email does not exist", { cause: 400 }));
        } 
        const match = compare({plainText:password,hashValue:user.password})
        if (! match ) {
            return next(new Error("In-Valid Login Data", { cause: 400 }));
        }
        const token = generateToken({payload:{userName:user.userName , id:user._id,isLoggedIn:true},
        signature:process.env.TOKEN_SIGNATURE
        })
        return res.status(201).json({message:"Done" , token})
        
    }
   
