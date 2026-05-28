import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

/* GENERATE TOKENS */
const generateTokens = (userId) => {
	const accessToken = jwt.sign(
		{ userId },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "15m",
		}
	);

	const refreshToken = jwt.sign(
		{ userId },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: "7d",
		}
	);

	return {
		accessToken,
		refreshToken,
	};
};

/* STORE REFRESH TOKEN IN REDIS */
const storeRefreshToken = async (
	userId,
	refreshToken
) => {
	await redis.set(
		`refresh_token:${userId}`,
		refreshToken,
		"EX",
		7 * 24 * 60 * 60
	);
};

/* COOKIE OPTIONS */
const cookieOptions = {
	httpOnly: true,
	secure:
		process.env.NODE_ENV ===
		"production",
	sameSite:
		process.env.NODE_ENV ===
		"production"
			? "none"
			: "strict",
			path:"/",
};

/* SET COOKIES */
const setCookies = (
	res,
	accessToken,
	refreshToken
) => {
	res.cookie(
		"accessToken",
		accessToken,
		{
			...cookieOptions,
			maxAge:
				15 *
				60 *
				1000,
		}
	);

	res.cookie(
		"refreshToken",
		refreshToken,
		{
			...cookieOptions,
			maxAge:
				7 *
				24 *
				60 *
				60 *
				1000,
		}
	);
};

/* SIGNUP */
export const signup = async (
	req,
	res
) => {
	const {
		email,
		password,
		name,
	} = req.body;

	try {
		const userExists =
			await User.findOne({
				email,
			});

		if (userExists) {
			return res
				.status(400)
				.json({
					message:
						"User already exists",
				});
		}

		const user =
			await User.create({
				name,
				email,
				password,
			});

		const {
			accessToken,
			refreshToken,
		} = generateTokens(
			user._id
		);

		await storeRefreshToken(
			user._id,
			refreshToken
		);

		setCookies(
			res,
			accessToken,
			refreshToken
		);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log(
			"Signup Error:",
			error.message
		);

		res.status(500).json({
			message:
				"Server Error",
		});
	}
};

/* LOGIN */
export const login = async (
	req,
	res
) => {
	try {
		const {
			email,
			password,
		} = req.body;

		const user =
			await User.findOne({
				email,
			});

		if (
			!user ||
			!(
				await user.comparePassword(
					password
				)
			)
		) {
			return res
				.status(400)
				.json({
					message:
						"Invalid email or password",
				});
		}

		const {
			accessToken,
			refreshToken,
		} = generateTokens(
			user._id
		);

		await storeRefreshToken(
			user._id,
			refreshToken
		);

		setCookies(
			res,
			accessToken,
			refreshToken
		);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log(
			"Login Error:",
			error.message
		);

		res.status(500).json({
			message:
				"Server Error",
		});
	}
};

/* LOGOUT */
export const logout = async (
	req,
	res
) => {
	try {
		const refreshToken =
			req.cookies
				.refreshToken;

		if (refreshToken) {
			const decoded =
				jwt.verify(
					refreshToken,
					process.env
						.REFRESH_TOKEN_SECRET
				);

			await redis.del(
				`refresh_token:${decoded.userId}`
			);
		}

		res.clearCookie(
			"accessToken",
			cookieOptions
		);

		res.clearCookie(
			"refreshToken",
			cookieOptions
		);

		res.json({
			message:
				"Logged out successfully",
		});
	} catch (error) {
		console.log(
			"Logout Error:",
			error.message
		);

		res.status(500).json({
			message:
				"Server Error",
		});
	}
};

/* REFRESH TOKEN */
export const refreshToken =
	async (req, res) => {
		try {
			const refreshToken =
				req.cookies
					.refreshToken;

			if (!refreshToken) {
				return res
					.status(401)
					.json({
						message:
							"No refresh token provided",
					});
			}

			const decoded =
				jwt.verify(
					refreshToken,
					process.env
						.REFRESH_TOKEN_SECRET
				);

			const storedToken =
				await redis.get(
					`refresh_token:${decoded.userId}`
				);

			if (
				storedToken !==
				refreshToken
			) {
				return res
					.status(401)
					.json({
						message:
							"Invalid refresh token",
					});
			}

			const accessToken =
				jwt.sign(
					{
						userId:
							decoded.userId,
					},
					process.env
						.ACCESS_TOKEN_SECRET,
					{
						expiresIn:
							"15m",
					}
				);

			res.cookie(
				"accessToken",
				accessToken,
				{
					...cookieOptions,
					maxAge:
						15 *
						60 *
						1000,
				}
			);

			res.json({
				message:
					"Token refreshed successfully",
			});
		} catch (error) {
			console.log(
				"Refresh Token Error:",
				error.message
			);

			res.status(401).json({
				message:
					"Invalid refresh token",
			});
		}
	};

/* GET PROFILE */
export const getProfile =
	async (req, res) => {
		try {
			res.status(200).json(
				req.user
			);
		} catch (error) {
			console.log(
				"Profile Error:",
				error.message
			);

			res.status(500).json({
				message:
					"Server Error",
			});
		}
	};