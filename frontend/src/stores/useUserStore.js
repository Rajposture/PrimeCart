import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
	user: null,

	profile: null,

	loading: false,

	checkingAuth: true,

	/* =========================
	   SIGNUP
	========================= */

	signup: async ({
		name,
		email,
		password,
		confirmPassword,
	}) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });

			return toast.error(
				"Passwords do not match"
			);
		}

		try {
			const res = await axios.post(
				"/auth/signup",
				{
					name,
					email,
					password,
				}
			);

			set({
				user: res.data,
				loading: false,
			});

			toast.success(
				"Account created successfully"
			);
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message ||
					"Signup failed"
			);
		}
	},

	/* =========================
	   LOGIN
	========================= */

	login: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axios.post(
				"/auth/login",
				{
					email,
					password,
				}
			);

			set({
				user: res.data,
				loading: false,
			});

			toast.success("Welcome back");
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message ||
					"Login failed"
			);
		}
	},

	/* =========================
	   LOGOUT
	========================= */

	logout: async () => {
		try {
			await axios.post("/auth/logout");

			set({
				user: null,
				profile: null,
			});

			toast.success(
				"Logged out successfully"
			);
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
					"Logout failed"
			);
		}
	},

	/* =========================
	   CHECK AUTH
	========================= */

checkAuth: async () => {
	set({ checkingAuth: true });

	try {
		const response = await axios.get("/auth/profile");

		set({
			user: response.data,
			checkingAuth: false,
		});
	} catch (error) {
		console.log("AUTH ERROR:", error);

		console.log(
			"SERVER RESPONSE:",
			error.response?.data
		);

		console.log(
			"ERROR MESSAGE:",
			error.message
		);

		set({
			user: null,
			checkingAuth: false,
		});
	}
},



	refreshToken: async () => {
		if (get().checkingAuth) return;

		set({ checkingAuth: true });

		try {
			const response = await axios.post(
				"/auth/refresh-token"
			);

			set({ checkingAuth: false });

			return response.data;
		} catch (error) {
			set({
				user: null,
				checkingAuth: false,
			});

			throw error;
		}
	},



	getProfile: async () => {
		try {
			const res = await axios.get(
				"/users/profile"
			);

			set({
				profile: res.data,
			});
		} catch (error) {
			console.log(error);

			toast.error(
				error.response?.data?.message ||
					"Failed to fetch profile"
			);
		}
	},


	updateProfile: async (data) => {
		set({ loading: true });

		try {
			const res = await axios.put(
				"/users/profile",
				data
			);

			set({
				profile: res.data,
				user: res.data,
				loading: false,
			});

			toast.success(
				"Profile updated successfully"
			);
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message ||
					"Profile update failed"
			);
		}
	},


	addAddress: async (data) => {
		set({ loading: true });

		try {
			const res = await axios.post(
				"/users/address",
				data
			);

			set((state) => ({
				profile: {
					...state.profile,
					addresses: res.data,
				},

				loading: false,
			}));

			toast.success(
				"Address added successfully"
			);
		} catch (error) {
			set({ loading: false });

			toast.error(
				error.response?.data?.message ||
					"Failed to add address"
			);
		}
	},



	deleteAddress: async (id) => {
		try {
			const res = await axios.delete(
				`/users/address/${id}`
			);

			set((state) => ({
				profile: {
					...state.profile,
					addresses: res.data,
				},
			}));

			toast.success(
				"Address deleted successfully"
			);
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
					"Failed to delete address"
			);
		}
	},
}));


let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,

	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;

			try {
				if (refreshPromise) {
					await refreshPromise;

					return axios(originalRequest);
				}

				refreshPromise =
					useUserStore
						.getState()
						.refreshToken();

				await refreshPromise;

				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				useUserStore
					.getState()
					.logout();

				return Promise.reject(
					refreshError
				);
			}
		}

		return Promise.reject(error);
	}
);