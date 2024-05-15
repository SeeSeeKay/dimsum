import User from '../models/user.model.js';
import createError from '../helpers/createError.js';

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
  const { username, email, phone } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { username, email, phone },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json({
      success: 'User updated successfully.',
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user from the database
export const deleteUser = async (req, res, next) => {
  const user = req.user;
  if (!user) return next(createError(404, 'User not found!'));

  try {
    await User.findByIdAndDelete(user);

    res.status(200).json('User deleted successfully!');
  } catch (error) {
    next(error);
  }
};
