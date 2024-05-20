import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

const { Schema } = mongoose;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 50;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 70;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, optional: true, unique: true },
  password: { type: String, required: true, min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH },
  confirmPassword: { type: String, optional: true, min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH },
  refreshToken: { type: String, required: false }, // Store the refresh token
  avatar: { type: String, required: false },
  newPassword: { type: String, required: false },
  biography: { type: String, required: false}, // because by right Agent need to have biography, but optional for other roles
  role: {
    type: String,
    required: true,
    enum: ["Real Estate Agent", "Seller", "Buyer", "Admin"],
    //default: "Buyer" //For now set Buyer as default for testing purpose 
    // TODO: add UI to select role.
  }
}, { timestamps: true });

// Joi schema for user sign up validation
const userSignUpValidation = Joi.object({
  username: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH).alphanum(),
  email: Joi.string().required().email(),
  phone: Joi.number().optional().integer().positive(),
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  confirmPassword: Joi.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  role: Joi.string().required()
})

// Joi schema for user update details
const userUpdateDetailsValidation = Joi.object({
  username: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH).alphanum(),
  email: Joi.string().required().email(),
  phone: Joi.number().optional().integer().positive(),
})

// Joi schema for user change password validation
const userChangePasswordValidation = Joi.object({
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
  newPassword: Joi.string().required().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
});


// Hash the user's password before saving it
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});



// Adding virtual id for frontend friendliness
userSchema.virtual('id').get(function() {
  return this._id.toHexString();
})
userSchema.set('toJSON', { virtuals: true });

export default mongoose.model('User', userSchema);
export { userSignUpValidation };
export { userUpdateDetailsValidation };
export { userChangePasswordValidation };