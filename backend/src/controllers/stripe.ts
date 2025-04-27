import { Handler, RequestHandler } from "express";
import keys from "../config/keys";
import jwt from "jsonwebtoken";
import randomBytes from 'randombytes';
import Order from "../models/order";


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export const checkoutStripe: RequestHandler = async (req: any, res) => {
    const { items, email, shippingAddress, userId } = req.body;

    const transformedItems = items.map((item: any) => ({
        price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
                id: item.id,
                name: item.name,
                // images: [item.images],
                description: item.description,
            }
        },
        quantity: item.quantity,
    }))
    console.log("transformedItems", transformedItems)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: transformedItems,
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', "CA"],
        },
        mode: "payment",
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cart`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item: { image: any; }) => item.image))
        }
    })
    const totalAmount = items.reduce((acc: number, item: any) => acc + item.price, 0);

    const newOrder = new Order({
        user: userId,
        items: items.map((item: any) => ({
            itemId: item._id,
            price: item.price,
            quantity: item.quantity,
        })),
        totalAmount,
        status: "Pending",
        paymentIntentId: session.id, 
        paymentDate: new Date(),
        shippingAddress: shippingAddress,
    });


    try {
        await newOrder.save();
        console.log("Order successfully registered.");
    } catch (err) {
        console.error("Error saving order", err);
        return res.status(500).json({ error: "Error saving order." });
    }
    res.status(200).json({ id: session.id })
};
