import { asyncHandler } from '../../utils/errorHandling.js';
import * as authController from './controller/auth.js'
import * as authValidator from './auth.validation.js'
import { Router } from "express";
import { validation } from '../../middleware/validation.js';
import uploadFile, { fileValidation } from '../../utils/multer.js';
import { auth } from '../../middleware/auth.js';

const router = Router();

router.post('/signUp',validation(authValidator.signup),asyncHandler(authController.signUp))
router.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail))
router.get('/newConfirmEmail/:token',asyncHandler(authController.newConfirmEmail))
router.post('/login',validation(authValidator.login),asyncHandler(authController.login))

export default router