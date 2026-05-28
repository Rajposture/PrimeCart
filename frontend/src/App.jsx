import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import ProfilePage from "./pages/ProfilePage";
import AddressPage from "./pages/AddressPage";

import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

function App() {
	const {
		user,
		checkAuth,
		checkingAuth,
		getProfile,
	} = useUserStore();

	const { getCartItems } = useCartStore();

	/* CHECK AUTH */
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	/* GET CART */
	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

	
	useEffect(() => {
		if (!user) return;

		getProfile();
	}, [getProfile, user]);

	if (checkingAuth) {
		return <LoadingSpinner />;
	}

	return (
		<div className='min-h-screen bg-[#0b1120] text-white relative overflow-hidden'>
			{/* BACKGROUND */}
			<div className='absolute inset-0 overflow-hidden'>
				{/* MAIN GRADIENT */}
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_30%)]' />

				{/* GRID EFFECT */}
				<div className='absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]' />

				{/* BLUR ORBS */}
				<div className='absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full' />

				<div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full' />
			</div>

			{/* MAIN CONTENT */}
			<div className='relative z-50'>
				<Navbar />

				<div className='pt-20'>
					<Routes>
						{/* HOME */}
						<Route
							path='/'
							element={<HomePage />}
						/>

						{/* AUTH */}
						<Route
							path='/signup'
							element={
								!user ? (
									<SignUpPage />
								) : (
									<Navigate to='/' />
								)
							}
						/>

						<Route
							path='/login'
							element={
								!user ? (
									<LoginPage />
								) : (
									<Navigate to='/' />
								)
							}
						/>

						{/* ADMIN */}
						<Route
							path='/secret-dashboard'
							element={
								user?.role ===
								"admin" ? (
									<AdminPage />
								) : (
									<Navigate to='/login' />
								)
							}
						/>

						{/* CATEGORY */}
						<Route
							path='/category/:category'
							element={
								<CategoryPage />
							}
						/>

						{/* CART */}
						<Route
							path='/cart'
							element={
								user ? (
									<CartPage />
								) : (
									<Navigate to='/login' />
								)
							}
						/>

						{/* PROFILE */}
						<Route
							path='/profile'
							element={
								user ? (
									<ProfilePage />
								) : (
									<Navigate to='/login' />
								)
							}
						/>

						{/* ADDRESSES */}
						<Route
							path='/addresses'
							element={
								user ? (
									<AddressPage />
								) : (
									<Navigate to='/login' />
								)
							}
						/>

						{/* PAYMENT SUCCESS */}
						<Route
							path='/purchase-success'
							element={
								user ? (
									<PurchaseSuccessPage />
								) : (
									<Navigate to='/login' />
								)
							}
						/>

						{/* PAYMENT CANCEL */}
						<Route
							path='/purchase-cancel'
							element={
								user ? (
									<PurchaseCancelPage />
								) : (
									<Navigate to='/login' />
								)
							}
						/>
					</Routes>
				</div>
			</div>

			{/* TOASTER */}
			<Toaster
				position='top-right'
				toastOptions={{
					style: {
						background: "#111827",
						color: "#fff",
						border:
							"1px solid rgba(255,255,255,0.1)",
						borderRadius: "16px",
					},
				}}
			/>
		</div>
	);
}

export default App;