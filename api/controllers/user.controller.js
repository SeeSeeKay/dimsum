import User, { userUpdateDetailsValidation } from '../models/user.model.js';
import createError from '../helpers/createError.js';
import fs from 'fs';

// Retrive all Users profile
export const getUsers = async (req,res, next) => {
  try{
    const users = await User.find().select('-password');
    if(!users) return next(createError(500, 'The users was not found!'));
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
}

// Get User Details
export const getUserDetails = async (req, res, next) => {
  try{
    const user = await User.findById(req.user).select('-password');
    if(!user) return next(createError(404, 'User not found!'));

    res.status(200).json({ success: true, user })

  } catch (error) {
    next(createError(500, 'Server error!'));
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  const { username, email, phone } = req.body;
  const file = req.file;

  try {
    // Validate the user data using Joi
    const { error } = userUpdateDetailsValidation.validate({ username, email, phone });
    if (error) return next(createError(400, error.details[0].message));

    let avatarBase64;

    // Check if file was uploaded
    if (file) {
      // Read the uploaded file and convert it to Base64
      const filePath = path.join(__dirname, '..', 'uploads', file.filename);
      const fileData = fs.readFileSync(filePath);
      avatarBase64 = `data:${file.mimetype};base64,${fileData.toString('base64')}`;
    } else {
      // If no file was uploaded, use UI Avatars API with Base64 placeholder
      const base64Avatar = Buffer.from(`https://ui-avatars.com/api/?background=random&rounded=true&name=${username}`).toString('base64');
      avatarBase64 = `data:image/png;base64,${base64Avatar}`;
    }

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { username, email, phone, avatar: avatarBase64 },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return next(createError(404, 'User not found'));
    }

    res.status(200).json({
      success: 'User updated successfully.',
      updatedUser
    });
  } catch (error) {
    next(error);
  }
};


// Delete user from the database
export const deleteUser = async (req, res, next) => {
  const user = req.user
  if(!user) return next(createError('User not found!'));

  try{
    await User.findByIdAndDelete(user);

    res.
      status(200).
      json('User deleted successfully!');
  } catch (error) {
    next(error)
  }
}
