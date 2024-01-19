
import express from "express";
import * as StripeController from "../../controllers/stripe";
import auth from "../../middleware/auth";
import multer from "../../middleware/multer-config";

const router = express.Router();

// POST /api/stripe/pay
// router.post("/pay", async (req, res, next) => {

    // try {
        // const amount = req.body.amount;
        // const payementIntent = await stripe.paymentIntents.create({
        //     // amount: amount * 100,
        //     // currency: 'usd',
        //     amount: 1099,
        //     currency: 'usd',
        //     payment_method_types: ['card'],
        //     description: 'Thanks for your purchase!',
        //     receipt_email: 'I.override.your.customer.email.settings@example.com',
        // });
        // res.json({
        //     msg: 'payment intent created',
        //     clientSecret: payementIntent.client_secret
        // })

    //     const { items, email } = req.body

    //     const transformedItems = items.map((item: { description: any; price: number; name: any; images: any; }) => ({
    //         description: item.description,
    //         quantity: 1,
    //         price_data: {
    //             currency: "usd",
    //             unit_amount: item.price * 100,
    //             product_data: {
    //                 name: item.name,
    //                 images: [item.images]
    //             }
    //         }
    //     }))
    //     const session = await stripe.checkout.sessions.create({
    //         payment_method_types: ['card'],
    //         line_items: transformedItems,
    //         mode: "payment",
    //         success_url: `http://localhost:3001/success`,
    //         cancel_url: `http://localhost:3001/checkout`,
    //         metadata: {
    //             email,
    //             images: JSON.stringify(items.map((item: { image: any; }) => item.image))
    //         }
    //     })
    //     res.status(200).json({ id: session.id })
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ msg: "error", error })
    // }
    // console.log("req.body", req.body)
    // stripe.charges.create(
    //     {
    //         // source: req.body.tokenId,
    //         // amount: req.body.amount,
    //         // currency: "usd",
    //         amount: req.body.amount,
    //         currency: 'usd',
    //         source: 'tok_visa',
    //     },
    //     (stripeErr: any, stripeRes: any) => {
    //         if (stripeErr) {
    //             console.log(stripeRes)
    //             res.status(500).json(stripeErr);
    //         } else {
    //             console.log(stripeRes)
    //             res.status(200).json(stripeRes);
    //         }
    //     }
    // );
// })

router.post("/pay", StripeController.checkoutStripe);

// router.get("/:id", ProductController.getProduct);

// router.post("/add", auth, multer.single("photo"), ProductController.addProduct);

export default router;
