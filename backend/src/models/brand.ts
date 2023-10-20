import { InferSchemaType, model } from "mongoose";

import Mongoose from 'mongoose';
// import slug from 'mongoose-slug-generator';
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

// Mongoose.plugin(slug, options);

// Brand Schema
const brandSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  // slug: {
  //   type: String,
  //   slug: 'name',
  //   unique: true
  // },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    default: null
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

type Brand = InferSchemaType<typeof brandSchema>

export default model<Brand>('Brand', brandSchema);
