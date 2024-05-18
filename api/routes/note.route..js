import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { 
  addNote,
  deleteNote,
  getNotes,
  updateNote
} from '../controllers/note.controller.js';
import {isAuthenticated} from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

router.get('/:propertyId', getNotes);
router.post('/add', addNote);
router.put('/:id', updateNote);
router.delete('/delete/:id', deleteNote);

export default router;