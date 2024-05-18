import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    description: {
      type: String,
      required: true
    }
  });
  
  // Define Account schema
  const accountSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    },
    photo: {
      type: Buffer // Assuming you want to store images as binary data
    },
    bio: {
      type: String
    }
  });
  
  // Define BuyerPropertySaved schema
  const buyerPropertySavedSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    }
  });
  
  // Define Rating schema
  const ratingSchema = new mongoose.Schema({
    points: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    review: String,
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    createdDt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Define Property schema
  const propertySchema = new mongoose.Schema({
    address: {
      type: String,
      required: true
    },
    image: {
      type: Buffer
    },
    document: {
      type: Buffer
    },
    status: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    no_of_bedrooms: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    tag: String,
    viewCount: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    createdDt: {
      type: Date,
      default: Date.now
    },
    updatedDt: {
      type: Date,
      default: Date.now
    },
    purchasedDt: Date
  });
  
  // Define Note schema
  const noteSchema = new mongoose.Schema({
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }, {timestamps: true});
  
  // Define PriceHistory schema
  const priceHistorySchema = new mongoose.Schema({
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property'
    },
    amount: {
      type: Number,
      required: true
    },
    createdDt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Define Contract schema
  const contractSchema = new mongoose.Schema({
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    createdDt: {
      type: Date,
      default: Date.now
    },
    terminatedDt: Date
  });
  
  // Define Transaction schema
  const transactionSchema = new mongoose.Schema({
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract'
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    },
    createdDt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['successful', 'failed'],
      required: true
    }
  });
  
  // Create models from the schemas
  export const Role = mongoose.model('Role', roleSchema);
  export const Account = mongoose.model('Account', accountSchema);
  export const BuyerPropertySaved = mongoose.model('BuyerPropertySaved', buyerPropertySavedSchema);
  export const Rating = mongoose.model('Rating', ratingSchema);
  // const Property = mongoose.model('Property', propertySchema);
  export const Note = mongoose.model('Note', noteSchema);
  export const PriceHistory = mongoose.model('PriceHistory', priceHistorySchema);
  export const Contract = mongoose.model('Contract', contractSchema);
  export const Transaction = mongoose.model('Transaction', transactionSchema);
  
  // module.exports = { Role, Account, BuyerPropertySaved, Rating, Property, Note, PriceHistory, Contract, Transaction };