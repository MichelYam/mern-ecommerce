import Mongoose, { InferSchemaType, model } from 'mongoose';

const { CART_ITEM_STATUS } = require('../constants');

const { Schema } = Mongoose;

// Cart Item Schema
const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: Number,
  purchasePrice: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  priceWithTax: {
    type: Number,
    default: 0
  },
  totalTax: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: CART_ITEM_STATUS.Not_processed,
    enum: [
      CART_ITEM_STATUS.Not_processed,
      CART_ITEM_STATUS.Processing,
      CART_ITEM_STATUS.Shipped,
      CART_ITEM_STATUS.Delivered,
      CART_ITEM_STATUS.Cancelled
    ]
  }
});

type CartItem = InferSchemaType<typeof cartItemSchema>
// export default model<CartItem>('CartItem', cartItemSchema);

// Cart Schema
const cartSchema = new Schema({
  products: [cartItemSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});
type Cart = InferSchemaType<typeof cartSchema>

export default model<Cart>('Cart', cartSchema);
