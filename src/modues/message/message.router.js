import { Router } from 'express'
const router = Router()
import * as messageContoller from './controller/message.js'
import * as validator from './message.validation.js'
import { asyncHandler } from '../../utils/errorHandling.js'
import { auth } from '../../middleware/auth.js'
import { validation } from '../../middleware/validation.js'


router.get('/',auth, asyncHandler(messageContoller.messages)) 
router.post('/:recieverId' , auth,validation(validator.sendMessage) ,asyncHandler(messageContoller.sendMessages))
router.delete('/:id' ,auth ,validation(validator.deleteMessage),asyncHandler(messageContoller.deleteMessage))


export default router