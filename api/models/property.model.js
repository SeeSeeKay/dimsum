import mongoose from 'mongoose';

const priceChangeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  price: { type: Number, required: true },
});

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  listingType: { type: String, enum: ['apartments', 'houses', 'offices'] },
  category: { type: String, enum: ['rent', 'sale'] },
  furnished: { type: Boolean, required: true },
  parking: { type: Boolean, required: true },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  imageUrl: { type: String, required: false },
  ownerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  priceHistory: [priceChangeSchema], // Array of price change events
  views: {type: Number},
}, { timestamps: true });

// Adding virtual id for frontend friendliness
PropertySchema.virtual('id').get(function () {
  return this._id.toHexString();
})
PropertySchema.set('toJSON', { virtuals: true });

export default mongoose.model('Property', PropertySchema);
