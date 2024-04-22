import joi from 'joi'
import { Types } from 'mongoose'

export const validation = (schema) => (req, res, next) => {
    let dataMethods ={...req.body,...req.params,...req.query}
    const validationResult = schema.validate(dataMethods,{abortEarly:false})
    if (validationResult?.error) {
        return res.json({message:"In-Valid Data",validationError:validationResult.error.details})
    }
    return next()
   
}


const objectIdValidation = (value,helpers)=>{
    return Types.ObjectId.isValid(value) 
    ? true
    : helpers.message('In-Valid Id Validation')
}
export const generalFields = {
    headers:joi.string().required(),
     id:joi.string().custom(objectIdValidation).required(),
    email:joi.string().email({
        minDomainSegments: 2,
        maxDomainSegments:4,
        tlds:{allow:['com','net','eg']}
    }).required() ,
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    .required(),
    cPassword:joi.string().required()
}