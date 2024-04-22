import joi from 'joi'
import { generalFields } from '../../middleware/validation.js';

export const signup = joi.object({
    firstName:joi.string().min(3).max(20).required(),
    lastName:joi.string().min(3).max(10).required(),
    userName:joi.string().alphanum().min(3).required(),
    email:generalFields.email,
    password:generalFields.password,
    cPassword:generalFields.cPassword.valid(joi.ref('password')),
    age:joi.number().integer().positive().min(18).max(89)
}).required()

export const login = joi.object({
    email:generalFields.email.required(),
    password:generalFields.password.required()
}).required()