import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import userRoutes from "./routes/user.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
const PORT =
	process.env.PORT || 5000;

const __dirname =
	path.resolve();

/* ========================================
   CORS CONFIGURATION
======================================== */

app.use(
	cors({
		origin:
			process.env
				.NODE_ENV ===
			"production"
				? "https://prime-cart-one.vercel.app"
				: "http://localhost:5173",

		credentials: true,
	})
);

/* ========================================
   MIDDLEWARES
======================================== */

app.use(
	express.json({
		limit: "10mb",
	})
);

app.use(cookieParser());

/* ========================================
   API ROUTES
======================================== */

app.use(
	"/api/auth",
	authRoutes
);

app.use(
	"/api/products",
	productRoutes
);

app.use(
	"/api/cart",
	cartRoutes
);

app.use(
	"/api/coupons",
	couponRoutes
);

app.use(
	"/api/payments",
	paymentRoutes
);

app.use(
	"/api/analytics",
	analyticsRoutes
);

app.use(
	"/api/users",
	userRoutes
);

/* ========================================
   HEALTH CHECK ROUTE
======================================== */

app.get("/", (req, res) => {
	res.send(
		"PrimeCart Backend API Running Successfully"
	);
});

/* ========================================
   START SERVER
======================================== */

app.listen(PORT, async () => {
	try {
		await connectDB();

		console.log(
			`✅ Server running on port ${PORT}`
		);
	} catch (error) {
		console.log(
			"❌ Database Connection Error:",
			error.message
		);
	}
});