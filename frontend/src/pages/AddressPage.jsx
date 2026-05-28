import { useEffect, useState } from "react";

import {
	MapPin,
	Plus,
	Trash2,
	Home,
	Building2,
} from "lucide-react";

import { motion } from "framer-motion";

import { useUserStore } from "../stores/useUserStore";

const AddressPage = () => {
	const {
		profile,
		getProfile,
		addAddress,
		deleteAddress,
		loading,
	} = useUserStore();

	const [formData, setFormData] = useState({
		fullName: "",
		phoneNumber: "",
		pincode: "",
		state: "",
		city: "",
		houseNumber: "",
		area: "",
		landmark: "",
		addressType: "Home",
	});

	useEffect(() => {
		getProfile();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await addAddress(formData);

		setFormData({
			fullName: "",
			phoneNumber: "",
			pincode: "",
			state: "",
			city: "",
			houseNumber: "",
			area: "",
			landmark: "",
			addressType: "Home",
		});

		getProfile();
	};

	return (
		<div className='min-h-screen bg-[#0b1120] text-white py-10 px-4'>
			<div className='max-w-7xl mx-auto'>
				{/* HEADER */}
				<div className='flex items-center justify-between mb-10'>
					<div>
						<h1 className='text-5xl font-black'>
							Your Addresses
						</h1>

						<p className='text-gray-400 mt-3 text-lg'>
							Manage your delivery locations
						</p>
					</div>
				</div>

				<div className='grid lg:grid-cols-2 gap-8'>
					{/* ADD ADDRESS FORM */}
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
							<Plus className='text-emerald-400' />

							<h2 className='text-3xl font-bold'>
								Add New Address
							</h2>
						</div>

						<form
							onSubmit={handleSubmit}
							className='space-y-5'
						>
							<input
								type='text'
								placeholder='Full Name'
								value={
									formData.fullName
								}
								onChange={(e) =>
									setFormData({
										...formData,
										fullName:
											e.target
												.value,
									})
								}
								className='w-full bg-[#1f2937] border border-white/10 rounded-2xl p-4'
							/>

							<input
								type='text'
								placeholder='Phone Number'
								value={
									formData.phoneNumber
								}
								onChange={(e) =>
									setFormData({
										...formData,
										phoneNumber:
											e.target
												.value,
									})
								}
								className='w-full bg-[#1f2937] border border-white/10 rounded-2xl p-4'
							/>

							<div className='grid grid-cols-2 gap-4'>
								<input
									type='text'
									placeholder='Pincode'
									value={
										formData.pincode
									}
									onChange={(
										e
									) =>
										setFormData(
											{
												...formData,
												pincode:
													e
														.target
														.value,
											}
										)
									}
									className='w-full bg-[#1f2937] border border-white/10 rounded-2xl p-4'
								/>

								<input
									type='text'
									placeholder='State'
									value={
										formData.state
									}
									onChange={(
										e
									) =>
										setFormData(
											{
												...formData,
												state:
													e
														.target
														.value,
											}
										)
									}
									className='w-full bg-[#1f2937] border border-white/10 rounded-2xl p-4'
								/>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<input
									type='text'
									placeholder='City'
									value={
										formData.city
									}
									onChange={(
										e
									) =>
										setFormData(
											{
												...formData,
												city:
													e
														.target
														.value,
											}
										)
									}
									className='w-full bg-[#1f2937] border border-white/10 rounded-2xl p-4'
								/>

								<input
									type='text'
									placeholder='House Number'
									value={
										formData.houseNumber
									}
									onChange={(
										e
									) =>
										setFormData(
											{
												...formData,
												houseNumber:
													e
														.target
														.value,
											}
										)
									}
									className='w-full bg-[#1f2937] border border-white/10 rounded-2xl p-4'
								/>
							</div>

							<input
								type='text'
								placeholder='Area / Street'
								value={formData.area}
								onChange={(e) =>
									setFormData({
										...formData,
										area: e.target.value,
									})
								}
								className='w-full bg-[#1f2937] border border-white/10 rounded-2xl p-4'
							/>

							<input
								type='text'
								placeholder='Landmark'
								value={
									formData.landmark
								}
								onChange={(e) =>
									setFormData({
										...formData,
										landmark:
											e.target
												.value,
									})
								}
								className='w-full bg-[#1f2937] border border-white/10 rounded-2xl p-4'
							/>

							<select
								value={
									formData.addressType
								}
								onChange={(e) =>
									setFormData({
										...formData,
										addressType:
											e.target
												.value,
									})
								}
								className='w-full bg-[#1f2937] border border-white/10 rounded-2xl p-4'
							>
								<option value='Home'>
									Home
								</option>

								<option value='Work'>
									Work
								</option>
							</select>

							<button
								type='submit'
								disabled={loading}
								className='w-full bg-emerald-600 hover:bg-emerald-500 transition-all py-4 rounded-2xl font-semibold'
							>
								Add Address
							</button>
						</form>
					</motion.div>

					{/* ADDRESS LIST */}
					<div className='space-y-6'>
						{profile?.addresses?.map(
							(address) => (
								<motion.div
									key={
										address._id
									}
									initial={{
										opacity: 0,
										y: 20,
									}}
									animate={{
										opacity: 1,
										y: 0,
									}}
									className='bg-[#111827]/90 border border-white/10 rounded-3xl p-6'
								>
									<div className='flex items-start justify-between mb-5'>
										<div className='flex items-center gap-3'>
											<div className='w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center'>
												{address.addressType ===
												"Home" ? (
													<Home className='text-emerald-400' />
												) : (
													<Building2 className='text-cyan-400' />
												)}
											</div>

											<div>
												<h3 className='text-xl font-bold'>
													{
														address.fullName
													}
												</h3>

												<p className='text-gray-400'>
													{
														address.addressType
													}
												</p>
											</div>
										</div>

										<button
											onClick={() =>
												deleteAddress(
													address._id
												)
											}
											className='text-red-400 hover:text-red-300 transition'
										>
											<Trash2 />
										</button>
									</div>

									<div className='space-y-3 text-gray-300'>
										<p>
											{
												address.houseNumber
											}
											,{" "}
											{
												address.area
											}
										</p>

										<p>
											{
												address.city
											}
											,{" "}
											{
												address.state
											}{" "}
											-{" "}
											{
												address.pincode
											}
										</p>

										<p>
											{
												address.phoneNumber
											}
										</p>

										{address.landmark && (
											<p className='text-gray-400'>
												Landmark:{" "}
												{
													address.landmark
												}
											</p>
										)}
									</div>
								</motion.div>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddressPage;