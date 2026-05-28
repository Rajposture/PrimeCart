import { useState } from "react";
import { Link } from "react-router-dom";

import {
	UserPlus,
	Mail,
	Lock,
	User,
	ArrowRight,
	Loader,
	Eye,
	EyeOff,
	CheckCircle2,
	Sparkles,
	ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			formData.password !== formData.confirmPassword
		) {
			return alert("Passwords do not match");
		}

		signup(formData);
	};

	const passwordChecks = [
		formData.password.length >= 8,
		/[A-Z]/.test(formData.password),
		/[0-9]/.test(formData.password),
	];

	return (
		<div className='min-h-screen bg-[#0b1120] flex items-center justify-center px-4 py-12 relative overflow-hidden'>
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
						<div className='flex items-center gap-4 mb-10'>


							<h1 className='text-4xl font-black text-white tracking-tight'>
								PrimeCart
							</h1>
						</div>

						<h2 className='text-5xl font-black leading-tight text-white mb-6'>
							Create Your
							<span className='text-emerald-400'>
								{" "}
								PrimeCart
							</span>{" "}
							Account
						</h2>

						<p className='text-gray-300 text-lg leading-relaxed max-w-md'>
							Join PrimeCart and unlock premium
							shopping experiences, exclusive deals,
							faster checkout and personalized
							recommendations.
						</p>
					</div>

					{/* FEATURES */}
					<div className='space-y-5'>
						<div className='flex items-center gap-4'>
							<div className='bg-emerald-500/15 p-3 rounded-2xl'>
								<ShieldCheck className='text-emerald-400 w-6 h-6' />
							</div>

							<div>
								<h3 className='font-semibold text-white'>
									Secure Registration
								</h3>

								<p className='text-gray-400 text-sm'>
									Protected account & encrypted
									data
								</p>
							</div>
						</div>

						<div className='flex items-center gap-4'>
							<div className='bg-cyan-500/15 p-3 rounded-2xl'>
								<UserPlus className='text-cyan-400 w-6 h-6' />
							</div>

							<div>
								<h3 className='font-semibold text-white'>
									Personalized Experience
								</h3>

								<p className='text-gray-400 text-sm'>
									Get recommendations tailored
									for you
								</p>
							</div>
						</div>
					</div>

					{/* GLOW */}
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
							Sign Up
						</h2>

						<p className='text-gray-400 text-lg'>
							Create your account to continue
						</p>
					</motion.div>

					<form
						onSubmit={handleSubmit}
						className='space-y-6'
					>
						{/* NAME */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Full Name
							</label>

							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-gray-400' />
								</div>

								<input
									type='text'
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target.value,
										})
									}
									className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all'
									placeholder='John Doe'
								/>
							</div>
						</div>

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
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
									className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						{/* PASSWORD */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Password
							</label>

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
									value={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password:
												e.target.value,
										})
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
									className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-400 transition-colors'
								>
									{showPassword ? (
										<EyeOff className='w-5 h-5' />
									) : (
										<Eye className='w-5 h-5' />
									)}
								</button>
							</div>

							{/* PASSWORD CHECKS */}
							<div className='mt-4 space-y-2'>
								<div className='flex items-center gap-2 text-sm'>
									<CheckCircle2
										className={`w-4 h-4 ${
											passwordChecks[0]
												? "text-emerald-400"
												: "text-gray-500"
										}`}
									/>

									<span
										className={
											passwordChecks[0]
												? "text-emerald-400"
												: "text-gray-500"
										}
									>
										Minimum 8 characters
									</span>
								</div>

								<div className='flex items-center gap-2 text-sm'>
									<CheckCircle2
										className={`w-4 h-4 ${
											passwordChecks[1]
												? "text-emerald-400"
												: "text-gray-500"
										}`}
									/>

									<span
										className={
											passwordChecks[1]
												? "text-emerald-400"
												: "text-gray-500"
										}
									>
										At least one uppercase letter
									</span>
								</div>

								<div className='flex items-center gap-2 text-sm'>
									<CheckCircle2
										className={`w-4 h-4 ${
											passwordChecks[2]
												? "text-emerald-400"
												: "text-gray-500"
										}`}
									/>

									<span
										className={
											passwordChecks[2]
												? "text-emerald-400"
												: "text-gray-500"
										}
									>
										At least one number
									</span>
								</div>
							</div>
						</div>

						{/* CONFIRM PASSWORD */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Confirm Password
							</label>

							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' />
								</div>

								<input
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									required
									value={
										formData.confirmPassword
									}
									onChange={(e) =>
										setFormData({
											...formData,
											confirmPassword:
												e.target.value,
										})
									}
									className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all'
									placeholder='••••••••'
								/>

								<button
									type='button'
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}
									className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-400 transition-colors'
								>
									{showConfirmPassword ? (
										<EyeOff className='w-5 h-5' />
									) : (
										<Eye className='w-5 h-5' />
									)}
								</button>
							</div>
						</div>

						{/* SUBMIT BUTTON */}
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
									Creating Account...
								</>
							) : (
								<>
									<UserPlus className='w-5 h-5' />
									Create Account
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
								Already have an account?
							</span>
						</div>
					</div>

					{/* LOGIN BUTTON */}
					<Link
						to='/login'
						className='group w-full border border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-300 py-4 rounded-2xl flex items-center justify-center gap-2 text-emerald-400 font-semibold'
					>
						Login Here
						<ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;