import bcrypt from 'bcryptjs';
import User, {userChangePasswordValidation, userUpdateDetailsValidation} from '../models/user.model.js';
import createError from '../helpers/createError.js';
import cloudinary from 'cloudinary'
import fs from 'fs';
import path from 'path';

// Retrieve all Users profile
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    if (!users) return next(createError(500, 'The users were not found!'));
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// Get User Details
export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) return next(createError(404, 'User not found!'));

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(createError(500, 'Server error!'));
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  console.log("update user details")
  const { username, email, phone } = req.body;
  const file = req.file;

  try {
    // Validate the user data using Joi
    const { error } = userUpdateDetailsValidation.validate({ username, email, phone });
    if (error) return next(createError(400, error.details[0].message));

    let avatar;

        // Check if file was uploaded
        if (file) {
          // Upload image to Cloudinary
          const result = await cloudinary.uploader.upload(file.path);
    
          // If file was uploaded, construct full avatar URL
          avatar= result.secure_url;
        }
    
        // find and Update user
        const updatedUser = await User.findByIdAndUpdate(
          req.user, 
          {username, email, phone, avatar: avatar }, 
          { new: true }).select("-password");
    
        if (!updatedUser) {
          return next(createError(404, 'User not found'));
        }
        res.
          status(200).json({ 
            success: 'User updated successfully.',
            updatedUser
          });
    
      } catch (error) {
        next(error);
      }
    }

// Update password
export const updatePassword = async (req, res, next) => {
  console.log("update password");
  const { currentPassword, newPassword } = req.body;

  try {
    // Validate password change data using Joi schema
    const { error } = userChangePasswordValidation.validate({ password: currentPassword, newPassword });
    if (error) return next(createError(400, error.details[0].message));

    const user = await User.findById(req.user);
    if (!user) return next(createError(404, 'User not found!'));

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return next(createError(400, 'Current password is incorrect!'));

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: 'Password updated successfully.' });
  } catch (error) {
    next(createError(500, 'Server error!'));
  }
};



// Delete user from the database
export const deleteUser = async (req, res, next) => {
  const user = req.user;
  if (!user) return next(createError('User not found!'));

  try {
    await User.findByIdAndDelete(user);

    res.status(200).json('User deleted successfully!');
  } catch (error) {
    next(error);
  }
};
