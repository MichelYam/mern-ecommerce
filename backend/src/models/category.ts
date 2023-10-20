import Mongoose, { InferSchemaType, model } from 'mongoose';
// import slug from 'mongoose-slug-generator';
const { Schema } = Mongoose;

const options = {
  separator: '-',
  lang: 'en',
  truncate: 120
};

// Mongoose.plugin(slug, options);

// Category Schema
const categorySchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
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
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});
type Category = InferSchemaType<typeof categorySchema>

export default model<Category>('Category', categorySchema);
