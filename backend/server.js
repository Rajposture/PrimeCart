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

const PORT =
	process.env.PORT || 5000;

const __dirname =
	path.resolve();

/* CORS */
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"https://prime-cart-one.vercel.app",
		],
		credentials: true,
	})
);

/* MIDDLEWARES */
app.use(
	express.json({
		limit: "10mb",
	})
);

app.use(cookieParser());

/* ROUTES */
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




/* START SERVER */
app.listen(PORT, () => {
	console.log(
		`Server running on port ${PORT}`
	);

	connectDB();
});