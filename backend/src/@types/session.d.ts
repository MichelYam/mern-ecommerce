import mongoose from "mongoose";
import express from "express";

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
        export interface Response {
            user: any;
        }
    }
}

// declare module "express-session" {
//     interface SessionData {
//         userId: mongoose.Types.ObjectId;
//     }
// }