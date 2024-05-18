import { v2 as cloudinary } from 'cloudinary';
import { Note } from '../models/models.js';
import createError from '../helpers/createError.js';
import mongoose from 'mongoose';

// const mongoose = require('mongoose');

// Add property
export const addNote = async (req, res, next) => {
  const { propertyId, description } = req.body;

  console.log("PropertyId in addNote : "+propertyId);
  console.log("Description in addNote : "+description);

  try {
    // Ensure that all required fields are provided
    if (!description) {
      return next(createError(400, "Please fill in note for saving."));
    }
    if(!propertyId){
      return next(createError(400, "No property detected for this note."));
    }

    // TODO: for now comment out to bypass this checking

    // Ensure that ownerId is present in the request (assuming it's populated by middleware)
    // const ownerId = req.user;
    // if (!ownerId) {
    //   return next(createError(404, "Owner not found"));
    // }

    // Create a new property
    const newNote = await Note.create({
      propertyId,
      description
    });
  
    res.status(201).json({ 
      message: 'Note added successfully', 
      newNote 
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

// Retrieve a single property using its ID.
export const getNotes = async (req, res, next) => {
  console.log("getNotes method executed.");
  // const propID =  mongoose.Types.ObjectId(req.params.propertyId);
  const propID = req.params.propertyId;

  try{
    // const note = await Note.findById(propID).populate('ownerId', '-password -refreshToken');
    const notes = await Note.find({ propertyId : propID});
    if (!notes) {
      return next(createError(404, 'No note has been created'));
    } 
    res.status(200).json(notes);
    console.log("getNotes notes : "+notes);
  } catch(error){
    next(error);
  }
};

// Update property by ID
export const updateNote = async (req, res, next) => {
  const { id } = req.params;

  const { description } = req.body;

  try {
    // Find the property by id
    let note = await Note.findById(id);

    //  Check if the property exists
    if (!note) {
      return next(createError(404, "Note not found"));
    }

    // TODO: For now, disable Auth check for testing purpose. To be enabled next time.
    
    // Ensure that the user owns the property
    // const ownerId = req.user;
    // if (!ownerId) {
    //   return next(createError(404, "Owner not found"));
    // }

    // if (property.ownerId.toString() !== ownerId) {
    //   return next(createError(403, "You are not authorized to edit this property"));
    // }

    // Update the property
    note = await Note.findByIdAndUpdate(id, {
      description
    }, { new: true });

    if (!note) {
      throw createError(404, 'No note found');
    }

    res.status(200).json({ 
      message: 'Note updated successfully', 
      note
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Delete property by ID
export const deleteNote = async (req, res, next) => {

  try {
    // Find the property by ID
    const note = await Note.findById(req.params.id);

    // Check if the property exists
    if (!note) {
      return res.status(404).json({ error: 'Note not found!' });
    }

    // TODO: Commented out for testing purpose, to be enabled next time.
    // console.log(req.user !== property.ownerId.toString());

    // // Check if the user is authorized to delete the property
    // if (req.user !== property.ownerId.toString()) {
    //   return res.status(401).json({ error: 'You can only delete your own properties!' });
    // }

    // Delete the property
    await Note.findByIdAndDelete(req.params.id);

    // Respond with success message
    res.status(200).json({ message: 'Note has been deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};