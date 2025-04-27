
import express from "express";
import * as StripeController from "../../controllers/stripe";

const router = express.Router();

router.post("/pay", StripeController.checkoutStripe);

// router.get("/:id", ProductController.getProduct);

// router.post("/add", auth, multer.single("photo"), ProductController.addProduct);

export default router;
