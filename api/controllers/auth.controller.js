import User, { userSignUpValidation } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from '../helpers/createError.js';
import fs from 'fs';
import path from 'path';
const access_secret = "dimsum0abcdefghijkjlmnopqrstuvwxyz";
const refresh_secret = "dimsum0abcdefghijkjlmnopqrstuvwxyz";

// Sign up
export const signUp = async (req, res, next) => {
  const { username, email, phone, password, confirmPassword, role } = req.body;
  const file = req.file;

  // Throw a custom error if any required field is missing
  if ( !role || !username || !email || !phone || !password || !confirmPassword) {
    return next(createError(400, 'All fields are required!'));
  }

  try {
    // Throw a custom error if the confirmed password doesn't match
    if (password !== confirmPassword) return next(createError(400, 'Passwords do not match!'));

    // Validate the user data using Joi
    const { error } = userSignUpValidation.validate(req.body);
    if (error) return next(createError(400, error.details[0].message));

    let avatar;

    // Generate profile image URL using UI Avatars API
    avatar = `https://ui-avatars.com/api/?background=random&rounded=true&name=${username}`;

    // check if username or user email exists in the database
    const userExist = await User.findOne({ email })
    if(userExist) return next(createError(409, 'This user already exist!'));

    // Create the new user
    const newUser = new User({
      username, email, phone, password, avatar, role
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// Sign in
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(createError(400, 'Email and password are required.'));

  try {
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, 'User not found!'));

    // Compare user's entered password with the stored hash
    const comparingPassword = await bcrypt.compare(password, user.password);
    if (!comparingPassword) return next(createError(400, 'Invalid Credential!'));

    // If valid, create an access token
    const accessToken = genAccessToken(user);
    // Generate a refresh token
    const refreshToken = genRefreshToken(user);

    // Save the refresh token in the database
    await User.findOneAndUpdate({ _id: user.id }, { refreshToken });

    // Return only the necessary information for the client side
    const { password: pass, ...rest } = user._doc;

    res
      // Set the refresh token as an HttpOnly cookie
      .cookie('refresh_token', refreshToken, {
        httpOnly: true, // Prevent XSS attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .header('Authorization', `Bearer ${accessToken}`)
      .status(200)
      .json({
        message: 'Welcome to your account!',
        data: rest, accessToken, refreshToken
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Signin failed' });
    next(error);
  }
};

// Generate JWT token
const genAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id },
    access_secret,
    { expiresIn: '1d' }
  );
};

// Generate a refresh token
const genRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    refresh_secret,
    { expiresIn: '30d' }
  );
};

// Route to get a new access token using the refresh token
export const getAccessToken = async (req, res) => {
  const accessToken = jwt.sign(
    { userId: req.userId },
    access_secret,
    { expiresIn: '1h' }
  );
  res
    .header('Authorization', `Bearer ${accessToken}`)
    .json({ accessToken });
};

// Handle Signout
export const signOut = async (req, res, next) => {
  const userId = req.user;
  // console.log(userId);
  try {
    // Clear the refresh token from the database
    await User.findOneAndUpdate(
      { _id: userId },
      { refreshToken: '' }
    );

    res
      .cookie('refresh_token', '', {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({ message: "Successfully signed out." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
