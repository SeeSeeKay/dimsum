import { v2 as cloudinary } from 'cloudinary';
import { BuyerPropertySaved } from '../models/models.js';
import createError from '../helpers/createError.js';
import mongoose from 'mongoose';

// const mongoose = require('mongoose');

// Add property
export const addPropertySave = async (req, res, next) => {
  const { userId, propertyId } = req.body;

  console.log("userId in addPropertySave : "+userId);
  console.log("propertyId in addPropertySave : "+propertyId);

  try {
    // Ensure that all required fields are provided
    if (!userId) {
      return next(createError(400, "Cannot get userId."));
    }
    if(!propertyId){
      return next(createError(400, "Cannot get propertyId."));
    }

    // TODO: for now comment out to bypass this checking

    // Ensure that ownerId is present in the request (assuming it's populated by middleware)
    // const ownerId = req.user;
    // if (!ownerId) {
    //   return next(createError(404, "Owner not found"));
    // }

    // Create a new property
    const newSavedProperty = await BuyerPropertySaved.create({
      userId,
      propertyId
    });
  
    res.status(201).json({ 
      message: 'newSavedProperty added successfully', 
      newSavedProperty 
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

// Retrieve a single property using its ID.
export const getAllSavedProperties = async (req, res, next) => {
  console.log("getAllSavedProperties method executed.");
  // const propID =  mongoose.Types.ObjectId(req.params.propertyId);
  const userID = req.params.userId;

  try{
    // const note = await Note.findById(propID).populate('ownerId', '-password -refreshToken');
    const properties = await BuyerPropertySaved.find({ userId : userID});
    if (!properties) {
      return next(createError(404, 'User has no any properties added into favourite list'));
    } 
    res.status(200).json(properties);
    // console.log("getNotes notes : "+notes);
  } catch(error){
    next(error);
  }
};

// Retrieve a single property using its ID.
export const getSavedProperty = async (req, res, next) => {
  console.log("getSavedProperty method executed.");
  // const propID =  mongoose.Types.ObjectId(req.params.propertyId);
  const userID = req.params.userId;
  const propertyID = req.params.propertyId;

  try{
    // const note = await Note.findById(propID).populate('ownerId', '-password -refreshToken');
    const properties = await BuyerPropertySaved.find({ userId : userID, propertyId: propertyID});
    if (properties.length === 0) {
      console.log("User "+userID+" does not save property "+propertyId);
      return;
    } 
    res.status(200).json(properties);
  } catch(error){
    next(error);
  }
};

// Delete property by ID
export const removeSavedProperty = async (req, res, next) => {

  const userId = req.params.userId;
  const propertyId = req.params.propertyId;

  try {
    // Find the buyerSavedProperty by _id
    // const savedProperty = await BuyerPropertySaved.findById(req.params.id);
    const savedProperty = await BuyerPropertySaved.find({userId: userId, propertyId: propertyId});

    console.log("savedProperty _id : "+savedProperty._id);

    // Check if the property exists
    if (!savedProperty) {
      return res.status(404).json({ error: 'saveProperty not found!' });
    }

    // TODO: Commented out for testing purpose, to be enabled next time.
    // console.log(req.user !== property.ownerId.toString());

    // // Check if the user is authorized to delete the property
    // if (req.user !== property.ownerId.toString()) {
    //   return res.status(401).json({ error: 'You can only delete your own properties!' });
    // }

    // Delete the savedProperty
    await BuyerPropertySaved.deleteOne(savedProperty._id);

    // Respond with success message
    res.status(200).json({ message: 'SavedProperty has been unsaved!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to unsave savedProperty' });
  }
};