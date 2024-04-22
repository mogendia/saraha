
import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';


export const sendMessage = joi.object( {
    message:joi.string().min(3).max(2000).required(),
    recieverId: generalFields.id
}).required();

export const deleteMessage =joi.object( {
    id:generalFields.id
}).required();