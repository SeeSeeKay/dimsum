import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { 
  deleteUser, 
  updateUser,
  updatePassword,
  getUsers,
  getUserDetails,
} from '../controllers/user.controller.js';
import {isAuthenticated} from '../middleware/auth.middleware.js';
import uploadOptions from '../middleware/multer.middleware.js';

const router = express.Router();

// Uploding files
const uploadImage = uploadOptions.single('avatarBase64');

router.get('/', isAuthenticated, getUsers);
router.
  route('/profile').
  get(isAuthenticated, getUserDetails).
  put(isAuthenticated, uploadImage, updateUser, updatePassword);

router.delete('/:id', deleteUser);
// router.post('/dashboard', verifyToken, dashdoard)

export default router;
