import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { name, phoneNumber } = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			{
				name,
				phoneNumber,
			},
			{ new: true }
		).select("-password");

		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

export const addAddress = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		user.addresses.push(req.body);

		await user.save();

		res.status(200).json(user.addresses);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

export const deleteAddress = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		user.addresses = user.addresses.filter(
			(address) => address._id.toString() !== req.params.id
		);

		await user.save();

		res.status(200).json(user.addresses);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};