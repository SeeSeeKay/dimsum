import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { 
  addNote,
  getNotes,
  updateNote
} from '../controllers/note.controller.js';
import {isAuthenticated} from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

// Uploding files
// const uploadImage = upload.single('avatar');

// router.get('/', isAuthenticated, getUsers);
router.get('/:propertyId', getNotes);
router.post('/add', addNote);
router.put('/:id', updateNote);
// router.
//   route('/profile').
//   get(isAuthenticated, getUserDetails).
//   put(isAuthenticated, uploadImage, updateUser, updatePassword);

// router.delete('/delete/:id', deleteUser);
// router.post('/dashboard', verifyToken, dashdoard)

export default router;