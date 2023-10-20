import express from "express";
import * as ProductController from "../../controllers/products";
import auth from "../../middleware/auth";
import multer from "../../middleware/multer-config";

const router = express.Router();


router.get("/", ProductController.getProducts);

router.get("/:id", ProductController.getProduct);

router.post("/add", auth, multer.single("photo"), ProductController.addProduct);

// router.put("/:id", auth, ProductController.updateProduct);

// router.delete("/:id", auth, ProductController.deleteProduct);

// router.post("/logout", UserController.logout);

export default router;