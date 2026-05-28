import {
	XCircle,
	ArrowLeft,
	RefreshCcw,
	ShieldAlert,
	Headphones,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className='min-h-screen bg-[#0b1120] flex items-center justify-center px-4 py-10 relative overflow-hidden'>
			{/* BACKGROUND EFFECTS */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute top-0 left-0 w-[400px] h-[400px] bg-red-500/10 blur-3xl rounded-full' />

				<div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/10 blur-3xl rounded-full' />
			</div>

			{/* CARD */}
			<motion.div
				initial={{ opacity: 0, y: 40, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5 }}
				className='relative z-10 w-full max-w-2xl bg-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl'
			>
				{/* TOP STRIP */}
				<div className='h-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-500' />

				<div className='p-8 sm:p-12'>
					{/* ICON */}
					<div className='flex justify-center mb-8'>
						<div className='relative'>
							<div className='absolute inset-0 bg-red-500/20 blur-2xl rounded-full' />

							<div className='relative w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center'>
								<XCircle className='text-red-500 w-14 h-14' />
							</div>
						</div>
					</div>

					{/* TITLE */}
					<div className='text-center mb-8'>
						<h1 className='text-4xl sm:text-5xl font-black text-white mb-4'>
							Purchase Cancelled
						</h1>

						<p className='text-gray-400 text-lg leading-relaxed max-w-xl mx-auto'>
							Your payment process was cancelled
							and no amount has been charged from
							your account. You can continue
							shopping anytime.
						</p>
					</div>

					{/* INFO BOXES */}
					<div className='grid sm:grid-cols-2 gap-4 mb-8'>
						<div className='bg-[#1f2937]/80 border border-white/5 rounded-2xl p-5'>
							<div className='flex items-center gap-3 mb-3'>
								<div className='bg-red-500/10 p-3 rounded-xl'>
									<ShieldAlert className='text-red-400 w-5 h-5' />
								</div>

								<h3 className='font-bold text-white'>
									No Payment Deducted
								</h3>
							</div>

							<p className='text-gray-400 text-sm leading-relaxed'>
								Your transaction was safely
								cancelled before completing the
								payment process.
							</p>
						</div>

						<div className='bg-[#1f2937]/80 border border-white/5 rounded-2xl p-5'>
							<div className='flex items-center gap-3 mb-3'>
								<div className='bg-orange-500/10 p-3 rounded-xl'>
									<Headphones className='text-orange-400 w-5 h-5' />
								</div>

								<h3 className='font-bold text-white'>
									Need Assistance?
								</h3>
							</div>

							<p className='text-gray-400 text-sm leading-relaxed'>
								If you faced any issues during
								checkout, our support team is
								always ready to help you.
							</p>
						</div>
					</div>

					{/* WARNING BOX */}
					<div className='bg-red-500/5 border border-red-500/10 rounded-2xl p-5 mb-8'>
						<p className='text-red-300 text-sm text-center leading-relaxed'>
							Sometimes payments may fail due to
							network interruptions, payment
							gateway issues or cancelled checkout
							sessions.
						</p>
					</div>

					{/* ACTION BUTTONS */}
					<div className='flex flex-col sm:flex-row gap-4'>
						<Link
							to='/'
							className='flex-1 bg-[#1f2937] hover:bg-[#263244] border border-white/10 hover:border-white/20 text-white font-semibold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3'
						>
							<ArrowLeft size={20} />
							Return to Shop
						</Link>

						<Link
							to='/cart'
							className='flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-red-500/20'
						>
							<RefreshCcw size={20} />
							Try Again
						</Link>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;