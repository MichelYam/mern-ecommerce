import express from "express";
import * as CartController from "../../controllers/carts";
import auth from "../../middleware/auth";


const router = express.Router();


router.get("/", auth, CartController.getCart);

router.post("/add", auth, CartController.createCart);

router.put("/:cartId", auth, CartController.updateCart);

router.delete("/:cartId", auth, CartController.deleteCart);

router.delete("/:cartId/:productId'", auth, CartController.deleteProductCart);

// router.post("/logout", UserController.logout);

export default router;