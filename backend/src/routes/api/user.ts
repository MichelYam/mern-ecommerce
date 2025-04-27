import express from "express";
import * as UserController from "../../controllers/users";
import auth from "../../middleware/auth";

import multer from "../../middleware/multer-config";

const router = express.Router();

//authentification user

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/forgot", UserController.forgot);

router.post("/reset/:token", UserController.reset);

router.get("/profile", auth, UserController.getAuthenticatedUser);

router.get("/orders", auth, UserController.getOrders);

router.put("/", auth, multer.single("avatar"), UserController.updateUser);
// router.post("/logout", UserController.logout);

export default router;