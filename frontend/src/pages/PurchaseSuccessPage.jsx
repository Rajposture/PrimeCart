import {
	ArrowRight,
	CheckCircle2,
	PackageCheck,
	Truck,
	ShieldCheck,
	Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import Confetti from "react-confetti";

import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] =
		useState(true);

	const [error, setError] = useState(null);

	const [orderNumber, setOrderNumber] =
		useState("");

	const { clearCart } = useCartStore();

	useEffect(() => {
		const handleCheckoutSuccess = async (
			sessionId
		) => {
			try {
				const response = await axios.post(
					"/payments/checkout-success",
					{
						sessionId,
					}
				);

				clearCart();

				/* RANDOM ORDER ID */
				const generatedOrder =
					"#PC" +
					Math.floor(
						100000 + Math.random() * 900000
					);

				setOrderNumber(generatedOrder);
			} catch (error) {
				console.log(error);

				setError(
					"Something went wrong while processing your payment."
				);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId =
			new URLSearchParams(
				window.location.search
			).get("session_id");

		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);

			setError(
				"No session ID found in the URL"
			);
		}
	}, [clearCart]);

	/* LOADING SCREEN */
	if (isProcessing) {
		return (
			<div className='min-h-screen bg-[#0b1120] flex items-center justify-center px-4'>
				<div className='text-center'>
					<div className='w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6'>
						<Loader2 className='w-12 h-12 text-emerald-400 animate-spin' />
					</div>

					<h2 className='text-3xl font-bold text-white mb-3'>
						Processing Payment
					</h2>

					<p className='text-gray-400 text-lg'>
						Please wait while we confirm your
						order...
					</p>
				</div>
			</div>
		);
	}

	/* ERROR SCREEN */
	if (error) {
		return (
			<div className='min-h-screen bg-[#0b1120] flex items-center justify-center px-4'>
				<div className='bg-[#111827] border border-red-500/20 rounded-3xl p-10 max-w-lg w-full text-center'>
					<h2 className='text-4xl font-black text-red-500 mb-4'>
						Payment Failed
					</h2>

					<p className='text-gray-400 mb-8'>
						{error}
					</p>

					<Link
						to='/cart'
						className='inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-2xl transition-all'
					>
						Try Again
						<ArrowRight className='w-5 h-5' />
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-[#0b1120] flex items-center justify-center px-4 py-10 relative overflow-hidden'>
			{/* CONFETTI */}
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				numberOfPieces={500}
				recycle={false}
				gravity={0.08}
				style={{ zIndex: 50 }}
			/>

			{/* BACKGROUND EFFECTS */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-3xl rounded-full' />

				<div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full' />
			</div>

			{/* MAIN CARD */}
			<motion.div
				initial={{
					opacity: 0,
					y: 40,
					scale: 0.95,
				}}
				animate={{
					opacity: 1,
					y: 0,
					scale: 1,
				}}
				transition={{ duration: 0.5 }}
				className='relative z-10 w-full max-w-2xl bg-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl'
			>
				{/* TOP STRIP */}
				<div className='h-2 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500' />

				<div className='p-8 sm:p-12'>
					{/* SUCCESS ICON */}
					<div className='flex justify-center mb-8'>
						<div className='relative'>
							<div className='absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full' />

							<div className='relative w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center'>
								<CheckCircle2 className='text-emerald-400 w-14 h-14' />
							</div>
						</div>
					</div>

					{/* TITLE */}
					<div className='text-center mb-8'>
						<h1 className='text-4xl sm:text-5xl font-black text-white mb-4'>
							Purchase Successful
						</h1>

						<p className='text-gray-400 text-lg leading-relaxed max-w-xl mx-auto'>
							Thank you for shopping with
							PrimeCart. Your order has been
							successfully placed and is now being
							processed.
						</p>
					</div>

					{/* ORDER DETAILS */}
					<div className='bg-[#1f2937]/80 border border-white/5 rounded-3xl p-6 mb-8'>
						<div className='flex items-center justify-between py-3 border-b border-white/5'>
							<span className='text-gray-400'>
								Order Number
							</span>

							<span className='font-bold text-emerald-400'>
								{orderNumber}
							</span>
						</div>

						<div className='flex items-center justify-between py-3 border-b border-white/5'>
							<span className='text-gray-400'>
								Payment Status
							</span>

							<span className='text-green-400 font-semibold'>
								Paid Successfully
							</span>
						</div>

						<div className='flex items-center justify-between py-3'>
							<span className='text-gray-400'>
								Estimated Delivery
							</span>

							<span className='font-semibold text-white'>
								3 - 5 Business Days
							</span>
						</div>
					</div>

					{/* INFO BOXES */}
					<div className='grid sm:grid-cols-3 gap-4 mb-8'>
						<div className='bg-[#1f2937]/70 border border-white/5 rounded-2xl p-5 text-center'>
							<div className='w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4'>
								<PackageCheck className='text-emerald-400 w-6 h-6' />
							</div>

							<h3 className='font-bold text-white mb-2'>
								Order Confirmed
							</h3>

							<p className='text-gray-400 text-sm'>
								Your order has been verified and
								confirmed.
							</p>
						</div>

						<div className='bg-[#1f2937]/70 border border-white/5 rounded-2xl p-5 text-center'>
							<div className='w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4'>
								<Truck className='text-cyan-400 w-6 h-6' />
							</div>

							<h3 className='font-bold text-white mb-2'>
								Shipping Soon
							</h3>

							<p className='text-gray-400 text-sm'>
								Your products will be dispatched
								shortly.
							</p>
						</div>

						<div className='bg-[#1f2937]/70 border border-white/5 rounded-2xl p-5 text-center'>
							<div className='w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-4'>
								<ShieldCheck className='text-yellow-400 w-6 h-6' />
							</div>

							<h3 className='font-bold text-white mb-2'>
								Secure Payment
							</h3>

							<p className='text-gray-400 text-sm'>
								Your payment was securely
								processed.
							</p>
						</div>
					</div>

					{/* EMAIL NOTE */}
					<div className='bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 mb-8'>
						<p className='text-emerald-300 text-sm text-center leading-relaxed'>
							A confirmation email with order
							details and tracking updates has
							been sent to your registered email
							address.
						</p>
					</div>

					{/* ACTION BUTTONS */}
					<div className='flex flex-col sm:flex-row gap-4'>
						<Link
							to='/'
							className='flex-1 bg-[#1f2937] hover:bg-[#263244] border border-white/10 hover:border-white/20 text-white font-semibold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3'
						>
							Continue Shopping
							<ArrowRight size={20} />
						</Link>

						<Link
							to='/orders'
							className='flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20'
						>
							View Orders
							<ArrowRight size={20} />
						</Link>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseSuccessPage;