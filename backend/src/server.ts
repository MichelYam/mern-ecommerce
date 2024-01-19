import "dotenv/config"
// require('dotenv').config();
import express from "express";
import { Express, Request, Response } from 'express';
import UserModel from "./models/user"
import keys from './config/keys';
import userRoutes from "./routes/api/user";
import productRoutes from "./routes/api/product";
import cartRoutes from "./routes/api/cart";
import stripeRoutes from "./routes/api/stripe";
import setupDB from './config/db';
import helmet from "helmet";
import cors from "cors";
// import routes from './routes';
// import socket from './socket';

const app: Express = express();

const { port } = keys;

// Handle CORS issues
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    helmet({
        contentSecurityPolicy: false,
        frameguard: true
    })
);
require('./config/passport')(app);

app.get("/", async (req: Request, res: Response) => {
    res.send('Hello from my Express server v2!')
})
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/stripe", stripeRoutes);
// app.use(routes);

setupDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
