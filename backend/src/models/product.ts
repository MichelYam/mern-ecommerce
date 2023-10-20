import { InferSchemaType, Schema, model } from "mongoose";
import { ROLES } from '../constants';

const productSchema = new Schema({
    sku: {
        type: String
    },
    name: {
        type: String,
        trim: true
    },
    // slug: {
    //     type: String,
    //     slug: 'name',
    //     unique: true
    // },
    imageUrl: {
        type: String
    },
    imageKey: {
        type: String
    },
    description: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    // taxable: {
    //     type: Boolean,
    //     default: false
    // },
    // isActive: {
    //     type: Boolean,
    //     default: true
    // },
    brand: {
        // type: Schema.Types.ObjectId,
        // ref: 'Brand',
        // default: null
        type: String,
        trim: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})


type Product = InferSchemaType<typeof productSchema>

export default model<Product>("Product", productSchema)