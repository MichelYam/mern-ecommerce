import { InferSchemaType, Schema, model } from "mongoose";
import { ROLES, EMAIL_PROVIDER } from '../constants';

const userSchema = new Schema({
    // firstName: {
    //     type: String,
    //     required: [true, "Your first name is required"],
    // },
    // lastName: {
    //     type: String,
    //     required: [true, "Your last name is required"],
    // },
    name: {
        type: String,
        required: [true, "Your name is required"],
    },
    avatar: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    phoneNumber: {
        type: String
    },
    // dateOfBirth: {
    //     type: String,
    //     required: true
    // },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
        select: false
    },
    codePostal: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    role: {
        type: String,
        default: ROLES.Member,
        enum: [ROLES.Admin, ROLES.Member, ROLES.Merchant]
    },
    resetPasswordToken: {
        type: String,
        select: false

    },
    resetPasswordExpires: {
        type: Number,
        select: false
    },
    updated: Date,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})


type User = InferSchemaType<typeof userSchema>

export default model<User>("User", userSchema)