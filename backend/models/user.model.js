import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* ADDRESS SCHEMA */
const addressSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},

		phoneNumber: {
			type: String,
			required: true,
		},

		pincode: {
			type: String,
			required: true,
		},

		state: {
			type: String,
			required: true,
		},

		city: {
			type: String,
			required: true,
		},

		houseNumber: {
			type: String,
			required: true,
		},

		area: {
			type: String,
			required: true,
		},

		landmark: {
			type: String,
		},

		addressType: {
			type: String,
			enum: ["Home", "Work"],
			default: "Home",
		},

		isDefault: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},

		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},

		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [
				6,
				"Password must be at least 6 characters long",
			],
		},

		/* CART ITEMS */
		cartItems: [
			{
				quantity: {
					type: Number,
					default: 1,
				},

				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],

		/* ROLE */
		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},

		/* NEW FIELDS */

		profileImage: {
			type: String,
			default: "",
		},

		phoneNumber: {
			type: String,
			default: "",
		},

		addresses: [addressSchema],
	},
	{
		timestamps: true,
	}
);

/* HASH PASSWORD */
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);

		this.password = await bcrypt.hash(
			this.password,
			salt
		);

		next();
	} catch (error) {
		next(error);
	}
});

/* COMPARE PASSWORD */
userSchema.methods.comparePassword =
	async function (password) {
		return bcrypt.compare(
			password,
			this.password
		);
	};

const User = mongoose.model(
	"User",
	userSchema
);

export default User;