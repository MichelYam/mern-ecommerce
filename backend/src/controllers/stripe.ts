import { Handler, RequestHandler } from "express";
import keys from "../config/keys";
import jwt from "jsonwebtoken";
import randomBytes from 'randombytes';


const { secret, tokenLife } = keys.jwt;
interface JwtPayload {
    id: string
}
const stripe = require("stripe")("sk_test_51OWf4QFj5EZEN2h0QtmJYIaq4vluds3GOXX2Txibx7OOVonTA22oTj6Ygy4iJKE28IiCfGViYPDuYOTAQh2mYVh900ZAzJf4CZ")
export const checkoutStripe: RequestHandler = async (req: any, res) => {
    const { items, email } = req.body

    console.log("item", items)
    const transformedItems = items.map((item: any) => ({
        price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
                name: item.name,
                images: [item.images],
                description: item.description,
            }
        },
        quantity: 1,
    }))
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
    res.status(200).json({ id: session.id })
};
