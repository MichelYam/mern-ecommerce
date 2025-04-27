import Mongoose from 'mongoose';
const { Schema } = Mongoose;

// Order Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // cart: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Cart'
  // },
  items: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  // updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

export default module.exports = Mongoose.model('Order', OrderSchema);

