import express from "express";

import {
	getProfile,
	updateProfile,
	addAddress,
	deleteAddress,
} from "../controllers/user.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", protectRoute, getProfile);

router.put("/profile", protectRoute, updateProfile);

router.post("/address", protectRoute, addAddress);

router.delete("/address/:id", protectRoute, deleteAddress);

export default router;