import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
	LogIn,
	Mail,
	Lock,
	ArrowRight,
	Loader,
	Eye,
	EyeOff,
	ShieldCheck,
	Sparkles,
} from "lucide-react";

import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const { login, loading } = useUserStore();

	const handleSubmit = async (e) => {
		e.preventDefault();

		login(email, password);
	};

	return (
		<div className='min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#0b1120]'>
			{/* BACKGROUND EFFECTS */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-3xl rounded-full' />

				<div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full' />
			</div>

			{/* MAIN CONTAINER */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
				className='relative z-10 w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl'
			>
				{/* LEFT SIDE */}
				<div className='hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-900/30 to-cyan-900/20 p-12 relative overflow-hidden'>
					<div>
						<div className='flex items-center gap-3 mb-8'>

							<h1 className='text-3xl font-black text-white'>
								PrimeCart
							</h1>
						</div>

						<h2 className='text-5xl font-black leading-tight text-white mb-6'>
							Welcome Back to
							<span className='text-emerald-400'>
								{" "}
								PrimeCart
							</span>
						</h2>

						<p className='text-gray-300 text-lg leading-relaxed max-w-md'>
							Access your account, manage your orders,
							and explore premium fashion collections
							with a seamless shopping experience.
						</p>
					</div>

					<div className='space-y-5'>
						<div className='flex items-center gap-4'>
							<div className='bg-emerald-500/20 p-3 rounded-2xl'>
								<ShieldCheck className='text-emerald-400 w-6 h-6' />
							</div>

							<div>
								<h3 className='font-semibold text-white'>
									Secure Authentication
								</h3>

								<p className='text-gray-400 text-sm'>
									Protected login & encrypted data
								</p>
							</div>
						</div>

						<div className='flex items-center gap-4'>
							<div className='bg-cyan-500/20 p-3 rounded-2xl'>
								<LogIn className='text-cyan-400 w-6 h-6' />
							</div>

							<div>
								<h3 className='font-semibold text-white'>
									Fast Access
								</h3>

								<p className='text-gray-400 text-sm'>
									Smooth and modern shopping experience
								</p>
							</div>
						</div>
					</div>

					{/* Decorative Glow */}
					<div className='absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full' />
				</div>

				{/* RIGHT SIDE */}
				<div className='bg-[#111827]/90 backdrop-blur-xl p-8 sm:p-12'>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className='mb-10'
					>
						<h2 className='text-4xl font-black text-white mb-3'>
							Sign In
						</h2>

						<p className='text-gray-400 text-lg'>
							Login to continue your shopping journey
						</p>
					</motion.div>

					<form
						onSubmit={handleSubmit}
						className='space-y-6'
					>
						{/* EMAIL */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Email Address
							</label>

							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-400' />
								</div>

								<input
									type='email'
									required
									value={email}
									onChange={(e) =>
										setEmail(e.target.value)
									}
									className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						{/* PASSWORD */}
						<div>
							<div className='flex items-center justify-between mb-2'>
								<label className='block text-sm font-medium text-gray-300'>
									Password
								</label>

								<Link
									to='/forgot-password'
									className='text-sm text-emerald-400 hover:text-emerald-300'
								>
									Forgot Password?
								</Link>
							</div>

							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' />
								</div>

								<input
									type={
										showPassword
											? "text"
											: "password"
									}
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all'
									placeholder='••••••••'
								/>

								<button
									type='button'
									onClick={() =>
										setShowPassword(
											!showPassword
										)
									}
									className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white'
								>
									{showPassword ? (
										<EyeOff className='w-5 h-5' />
									) : (
										<Eye className='w-5 h-5' />
									)}
								</button>
							</div>
						</div>

						{/* REMEMBER ME */}
						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-3 cursor-pointer'>
								<input
									type='checkbox'
									checked={rememberMe}
									onChange={() =>
										setRememberMe(!rememberMe)
									}
									className='w-4 h-4 accent-emerald-500'
								/>

								<span className='text-sm text-gray-300'>
									Remember me
								</span>
							</label>

							<span className='text-xs text-gray-500'>
								Secure Login
							</span>
						</div>

						{/* LOGIN BUTTON */}
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							type='submit'
							disabled={loading}
							className='w-full bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 disabled:opacity-70'
						>
							{loading ? (
								<>
									<Loader className='w-5 h-5 animate-spin' />
									Signing In...
								</>
							) : (
								<>
									<LogIn className='w-5 h-5' />
									Sign In
								</>
							)}
						</motion.button>
					</form>

					{/* DIVIDER */}
					<div className='relative my-8'>
						<div className='absolute inset-0 flex items-center'>
							<div className='w-full border-t border-gray-700' />
						</div>

						<div className='relative flex justify-center text-sm'>
							<span className='bg-[#111827] px-4 text-gray-400'>
								New to PrimeCart?
							</span>
						</div>
					</div>

					{/* SIGNUP */}
					<Link
						to='/signup'
						className='group w-full border border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-300 py-4 rounded-2xl flex items-center justify-center gap-2 text-emerald-400 font-semibold'
					>
						Create Account
						<ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;