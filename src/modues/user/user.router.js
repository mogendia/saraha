import { auth } from '../../middleware/auth.js'
import { validation } from '../../middleware/validation.js';
import { asyncHandler } from '../../utils/errorHandling.js';
import uploadFile, { fileValidation } from '../../utils/multer.js';
import * as userController from './controller/user.js'
import * as validator from './user.validation.js'
import { Router } from 'express'
const router = Router()

router.get('/',auth, asyncHandler(userController.users))
router.patch('/profileImg',auth,uploadFile(fileValidation.image).single('image'),asyncHandler(userController.profileImg))
router.patch('/profileCoverImg',auth,uploadFile(fileValidation.image).array('image',5),asyncHandler(userController.profileCoverImg))
router.patch('/password',auth,validation(validator.updatePassword),asyncHandler(userController.updatePassword))
export default router