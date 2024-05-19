import express from 'express'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'dotenv/config'
import { addPropertySave, getAllSavedProperties, getSavedProperty, removeSavedProperty } from '../controllers/buyerPropertySaved.controller.js';
import {isAuthenticated} from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

router.get('/:userId', getAllSavedProperties);
router.get('/:userId/:propertyId', getSavedProperty);
router.post('/add', addPropertySave);
router.delete('/remove/:userId/:propertyId', removeSavedProperty);
// router.put('/:id', updateNote);
// router.delete('/delete/:id', deleteNote);

export default router;