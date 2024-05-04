import userModel from '../../DB/model/userModel.js';
import {asyncHandler} from '../utils/errorHandling.js'
import { verifyToken } from "../utils/jwt.js";
export const auth =asyncHandler(
    async (req,res,next)=>{
        const {authorization} = req.headers
        if(!authorization?.startsWith(process.env.BEARER_KEY)){ 
            return next(new Error('authorization required or In-Valid Bearer Key',{cause:401}));
        }
        const token = authorization.split(process.env.BEARER_KEY)[1]
        if (!token) {
            return next(new Error('Token is required',{cause:400}));
            
        }
       
        const decoded = verifyToken({token,signature:process.env.TOKEN_SIGNATURE}) 
        if (!decoded?.id) {
            return next(new Error('In-Valid payload',{cause:400}));
        }
       
        const user =await userModel.findById(decoded.id)
        if (!user) {
            return next(new Error('Not registered',{cause:401}));
        }
        
        req.user=user
        return next()
    }
)
