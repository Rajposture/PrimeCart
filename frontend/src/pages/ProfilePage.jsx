import { useEffect, useState } from "react";

import {
	User,
	Mail,
	Phone,
	ShieldCheck,
	MapPin,
	Edit3,
	Save,
} from "lucide-react";

import { motion } from "framer-motion";

import { useUserStore } from "../stores/useUserStore";

const ProfilePage = () => {
	const {
		user,
		profile,
		getProfile,
		updateProfile,
		loading,
	} = useUserStore();

	const [isEditing, setIsEditing] =
		useState(false);

	const [formData, setFormData] = useState({
		name: "",
		phoneNumber: "",
	});

	useEffect(() => {
		getProfile();
	}, []);

	useEffect(() => {
		if (profile) {
			setFormData({
				name: profile.name || "",
				phoneNumber:
					profile.phoneNumber || "",
			});
		}
	}, [profile]);

	const handleUpdate = async (e) => {
		e.preventDefault();

		await updateProfile(formData);

		setIsEditing(false);
	};

	return (
		<div className='min-h-screen bg-[#0b1120] text-white py-10 px-4'>
			<div className='max-w-6xl mx-auto'>
				{/* HEADER */}
				<div className='bg-[#111827]/90 border border-white/10 rounded-3xl p-8 mb-8'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
						<div className='flex items-center gap-6'>
							<div className='w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-black text-4xl font-black'>
								{user?.name?.charAt(0)}
							</div>

							<div>
								<h1 className='text-4xl font-black'>
									{user?.name}
								</h1>

								<p className='text-gray-400 mt-2'>
									Manage your PrimeCart
									account settings and
									personal information
								</p>
							</div>
						</div>

						<button
							onClick={() =>
								setIsEditing(
									!isEditing
								)
							}
							className='bg-emerald-600 hover:bg-emerald-500 transition-all px-6 py-3 rounded-2xl font-semibold flex items-center gap-3'
						>
							<Edit3 size={18} />
							{isEditing
								? "Cancel"
								: "Edit Profile"}
						</button>
					</div>
				</div>

				<div className='grid lg:grid-cols-3 gap-8'>
					{/* PROFILE INFO */}
					<div className='lg:col-span-2'>
						<motion.div
							initial={{
								opacity: 0,
								y: 20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							className='bg-[#111827]/90 border border-white/10 rounded-3xl p-8'
						>
							<div className='flex items-center gap-3 mb-8'>
								<User className='text-emerald-400' />

								<h2 className='text-3xl font-bold'>
									Personal Information
								</h2>
							</div>

							<form
								onSubmit={handleUpdate}
								className='space-y-6'
							>
								{/* NAME */}
								<div>
									<label className='block text-sm text-gray-400 mb-2'>
										Full Name
									</label>

									<div className='relative'>
										<User className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5' />

										<input
											type='text'
											value={
												formData.name
											}
											onChange={(
												e
											) =>
												setFormData(
													{
														...formData,
														name: e
															.target
															.value,
													}
												)
											}
											disabled={
												!isEditing
											}
											className='w-full bg-[#1f2937] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70'
										/>
									</div>
								</div>

								{/* EMAIL */}
								<div>
									<label className='block text-sm text-gray-400 mb-2'>
										Email Address
									</label>

									<div className='relative'>
										<Mail className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5' />

										<input
											type='email'
											value={
												user?.email
											}
											disabled
											className='w-full bg-[#1f2937] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-gray-400'
										/>
									</div>
								</div>

								{/* PHONE */}
								<div>
									<label className='block text-sm text-gray-400 mb-2'>
										Phone Number
									</label>

									<div className='relative'>
										<Phone className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5' />

										<input
											type='text'
											value={
												formData.phoneNumber
											}
											onChange={(
												e
											) =>
												setFormData(
													{
														...formData,
														phoneNumber:
															e
																.target
																.value,
													}
												)
											}
											disabled={
												!isEditing
											}
											className='w-full bg-[#1f2937] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70'
											placeholder='Enter phone number'
										/>
									</div>
								</div>

								{/* SAVE BUTTON */}
								{isEditing && (
									<button
										type='submit'
										disabled={
											loading
										}
										className='bg-emerald-600 hover:bg-emerald-500 transition-all px-8 py-4 rounded-2xl font-semibold flex items-center gap-3'
									>
										<Save
											size={18}
										/>
										Save Changes
									</button>
								)}
							</form>
						</motion.div>
					</div>

					{/* SIDEBAR */}
					<div className='space-y-6'>
						<motion.div
							initial={{
								opacity: 0,
								y: 20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								delay: 0.1,
							}}
							className='bg-[#111827]/90 border border-white/10 rounded-3xl p-6'
						>
							<div className='flex items-center gap-3 mb-5'>
								<ShieldCheck className='text-cyan-400' />

								<h3 className='text-2xl font-bold'>
									Account Status
								</h3>
							</div>

							<div className='space-y-5'>
								<div>
									<p className='text-gray-400 text-sm'>
										Account Type
									</p>

									<p className='text-lg font-semibold capitalize'>
										{user?.role}
									</p>
								</div>

								<div>
									<p className='text-gray-400 text-sm'>
										Addresses Saved
									</p>

									<p className='text-lg font-semibold'>
										{
											profile
												?.addresses
												?.length
										}
									</p>
								</div>

								<div>
									<p className='text-gray-400 text-sm'>
										Account Created
									</p>

									<p className='text-lg font-semibold'>
										{new Date(
											user?.createdAt
										).toDateString()}
									</p>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{
								opacity: 0,
								y: 20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								delay: 0.2,
							}}
							className='bg-[#111827]/90 border border-white/10 rounded-3xl p-6'
						>
							<div className='flex items-center gap-3 mb-5'>
								<MapPin className='text-emerald-400' />

								<h3 className='text-2xl font-bold'>
									Default Address
								</h3>
							</div>

							{profile?.addresses?.length >
							0 ? (
								<div className='space-y-3'>
									<p className='font-semibold'>
										{
											profile
												.addresses[0]
												.fullName
										}
									</p>

									<p className='text-gray-400 leading-relaxed'>
										{
											profile
												.addresses[0]
												.houseNumber
										}
										,{" "}
										{
											profile
												.addresses[0]
												.area
										}
										,{" "}
										{
											profile
												.addresses[0]
												.city
										}
									</p>

									<p className='text-gray-400'>
										{
											profile
												.addresses[0]
												.state
										}{" "}
										-{" "}
										{
											profile
												.addresses[0]
												.pincode
										}
									</p>
								</div>
							) : (
								<p className='text-gray-400'>
									No address added yet
								</p>
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;