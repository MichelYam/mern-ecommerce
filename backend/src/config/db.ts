import mongoose, { ConnectOptions, model } from "mongoose";

import keys from './keys';
const { database } = keys;
// const databaseUrl = process.env.DATABASE_URL

const setupDB = async () => {
    try {
        await mongoose.connect(database.url!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        } as ConnectOptions);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(`Failed to connect to MongoDB: ${error}`);
        // throw new Error(error);
    }
};

export default setupDB