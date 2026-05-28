import {
	ShoppingCart,
	LogOut,
	Lock,
	Search,
	MapPin,
	ChevronDown,
	Menu,
	Package,
	User,
	MapPinned,
} from "lucide-react";

import {
	Link,
	useNavigate,
} from "react-router-dom";

import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

import {
	useState,
	useRef,
	useEffect,
} from "react";

const departments = [
	{
		label: "All Departments",
		href: "/",
	},
	{
		label: "T-Shirts",
		href: "/t-shirts",
	},
	{
		label: "Jeans",
		href: "/jeans",
	},
	{
		label: "Shoes",
		href: "/shoes",
	},
	{
		label: "Jackets",
		href: "/jackets",
	},
	{
		label: "Suits",
		href: "/suits",
	},
	{
		label: "Bags",
		href: "/bags",
	},
	{
		label: "Glasses",
		href: "/glasses",
	},
];

const Navbar = () => {
	const {
		user,
		logout,
		profile,
	} = useUserStore();

	const isAdmin =
		user?.role === "admin";

	const { cart } =
		useCartStore();

	const navigate =
		useNavigate();

	const defaultAddress =
		profile?.addresses?.find(
			(address) =>
				address.isDefault
		) ||
		profile?.addresses?.[0];

	const [
		searchQuery,
		setSearchQuery,
	] = useState("");

	const [
		searchCategory,
		setSearchCategory,
	] = useState("All");

	const [
		accountMenuOpen,
		setAccountMenuOpen,
	] = useState(false);

	const [
		mobileMenuOpen,
		setMobileMenuOpen,
	] = useState(false);

	const accountRef =
		useRef(null);

	useEffect(() => {
		const handleClickOutside = (
			e
		) => {
			if (
				accountRef.current &&
				!accountRef.current.contains(
					e.target
				)
			) {
				setAccountMenuOpen(
					false
				);
			}
		};

		document.addEventListener(
			"mousedown",
			handleClickOutside
		);

		return () =>
			document.removeEventListener(
				"mousedown",
				handleClickOutside
			);
	}, []);

	const handleSearch = (
		e
	) => {
		e.preventDefault();

		if (
			searchQuery.trim()
		) {
			const cat =
				searchCategory !==
				"All"
					? `/${searchCategory
							.toLowerCase()
							.replace(
								" ",
								"-"
							)}`
					: "/";

			navigate(
				`${cat}?search=${encodeURIComponent(
					searchQuery.trim()
				)}`
			);
		}
	};

	return (
		<>
			<header className='fixed top-0 left-0 w-full z-50'>
				{/* TOP NAVBAR */}
				<div className='bg-[#07141d] text-white border-b border-white/5'>
					<div className='max-w-[1500px] mx-auto px-3 py-2 flex items-center gap-3'>
						{/* LOGO */}
						<Link
							to='/'
							className='flex items-center px-2 py-1 border border-transparent hover:border-white rounded transition-all duration-150 flex-shrink-0'
						>
							<div className='flex items-center gap-1'>
								<span className='text-white font-black text-[2rem] tracking-tight'>
									Prime
								</span>

								<span className='text-emerald-400 font-black text-[2rem] tracking-tight'>
									Cart
								</span>
							</div>
						</Link>

						{/* DELIVERY */}
						<Link
							to='/addresses'
							className='hidden lg:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded transition-all duration-150 flex-shrink-0'
						>
							<span className='text-gray-400 text-xs'>
								Deliver to
							</span>

							<span className='text-white text-sm font-bold flex items-center gap-1 max-w-[180px] truncate'>
								<MapPin
									size={14}
									className='text-emerald-400'
								/>

								{defaultAddress
									? `${defaultAddress.city}, ${defaultAddress.state}`
									: "Set Location"}
							</span>
						</Link>

						{/* SEARCH */}
						<form
							onSubmit={
								handleSearch
							}
							className='flex flex-1 h-11 rounded-xl overflow-hidden shadow-lg border border-white/5'
						>
							<select
								value={
									searchCategory
								}
								onChange={(
									e
								) =>
									setSearchCategory(
										e
											.target
											.value
									)
								}
								className='hidden sm:block bg-[#e5e7eb] text-[#111827] text-sm px-4 outline-none border-r border-gray-300'
							>
								<option>
									All
								</option>

								{departments
									.slice(1)
									.map(
										(
											d
										) => (
											<option
												key={
													d.label
												}
											>
												{
													d.label
												}
											</option>
										)
									)}
							</select>

							<input
								type='text'
								value={
									searchQuery
								}
								onChange={(
									e
								) =>
									setSearchQuery(
										e
											.target
											.value
									)
								}
								placeholder='Search PrimeCart...'
								className='flex-1 px-5 text-[#111827] bg-white outline-none text-sm'
							/>

							<button
								type='submit'
								className='bg-emerald-500 hover:bg-emerald-400 transition-all px-5 flex items-center justify-center'
							>
								<Search
									size={
										22
									}
									className='text-black'
								/>
							</button>
						</form>

						{/* ACCOUNT */}
						<div
							ref={
								accountRef
							}
							className='relative'
						>
							<button
								onClick={() =>
									setAccountMenuOpen(
										!accountMenuOpen
									)
								}
								className='flex flex-col px-2 py-1 border border-transparent hover:border-white rounded transition-all duration-150'
							>
								<span className='text-gray-400 text-xs'>
									{user
										? `Hello, ${user.name?.split(
												" "
										  )[0]}`
										: "Hello, Sign In"}
								</span>

								<span className='text-white text-sm font-bold flex items-center gap-1'>
									Account &
									Lists
									<ChevronDown
										size={
											14
										}
									/>
								</span>
							</button>

							{/* DROPDOWN */}
							{accountMenuOpen && (
								<div className='absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200'>
									{!user ? (
										<div className='p-5'>
											<Link
												to='/signup'
												onClick={() =>
													setAccountMenuOpen(
														false
													)
												}
												className='w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all'
											>
												Create
												Account
											</Link>

											<p className='text-sm text-gray-500 mt-3 text-center'>
												Already
												have
												an
												account?{" "}
												<Link
													to='/login'
													className='text-emerald-600 hover:underline'
												>
													Sign
													In
												</Link>
											</p>
										</div>
									) : (
										<>
											<div className='p-4 bg-gray-50 border-b'>
												<p className='text-sm font-semibold text-gray-900'>
													Signed
													in
													as{" "}
													<span className='text-emerald-600'>
														{
															user.name
														}
													</span>
												</p>

												<p className='text-xs text-gray-400 truncate mt-1'>
													{
														user.email
													}
												</p>
											</div>

											<div className='grid grid-cols-2 gap-4 p-4 text-sm'>
												<div>
													<p className='font-bold text-gray-900 mb-2'>
														Account
													</p>

													<div className='space-y-2'>
														<Link
															to='/profile'
															onClick={() =>
																setAccountMenuOpen(
																	false
																)
															}
															className='flex items-center gap-2 text-gray-600 hover:text-emerald-500'
														>
															<User
																size={
																	15
																}
															/>
															Profile
														</Link>

														<Link
															to='/addresses'
															onClick={() =>
																setAccountMenuOpen(
																	false
																)
															}
															className='flex items-center gap-2 text-gray-600 hover:text-emerald-500'
														>
															<MapPinned
																size={
																	15
																}
															/>
															Addresses
														</Link>

														<Link
															to='/cart'
															className='text-gray-600 hover:text-emerald-500'
														>
															Cart
														</Link>

														{isAdmin && (
															<Link
																to='/secret-dashboard'
																className='text-emerald-600 font-semibold hover:underline'
															>
																Admin
																Dashboard
															</Link>
														)}
													</div>
												</div>

												<div>
													<p className='font-bold text-gray-900 mb-2'>
														Orders
													</p>

													<div className='space-y-2'>
														<Link
															to='/cart'
															className='text-gray-600 hover:text-emerald-500'
														>
															Track
															Orders
														</Link>

														<Link
															to='/'
															className='text-gray-600 hover:text-emerald-500'
														>
															Refunds
														</Link>

														<button
															onClick={() => {
																logout();

																setAccountMenuOpen(
																	false
																);
															}}
															className='text-red-500 hover:text-red-400'
														>
															Sign
															Out
														</button>
													</div>
												</div>
											</div>
										</>
									)}
								</div>
							)}
						</div>

						{/* ORDERS */}
						<Link
							to='/cart'
							className='hidden lg:flex flex-col px-2 py-1 border border-transparent hover:border-white rounded transition-all duration-150'
						>
							<span className='text-gray-400 text-xs'>
								Returns
							</span>

							<span className='text-white text-sm font-bold flex items-center gap-1'>
								<Package
									size={
										14
									}
								/>
								& Orders
							</span>
						</Link>

						{/* CART */}
						<Link
							to='/cart'
							className='flex items-end gap-1 px-2 py-1 border border-transparent hover:border-white rounded transition-all duration-150 relative'
						>
							<div className='relative'>
								<ShoppingCart
									size={
										32
									}
									className='text-white'
								/>

								{cart.length >
									0 && (
									<span className='absolute -top-2 left-3 bg-emerald-400 text-black text-xs font-black rounded-full min-w-[20px] h-5 flex items-center justify-center px-1'>
										{
											cart.length
										}
									</span>
								)}
							</div>

							<span className='hidden sm:block text-white text-sm font-bold pb-1'>
								Cart
							</span>
						</Link>

						{/* MOBILE MENU */}
						<button
							onClick={() =>
								setMobileMenuOpen(
									!mobileMenuOpen
								)
							}
							className='lg:hidden p-2'
						>
							<Menu
								size={
									24
								}
								className='text-white'
							/>
						</button>
					</div>
				</div>

				{/* BOTTOM NAV */}
				<div className='bg-[#101d2b] text-white border-b border-white/5'>
					<div className='max-w-[1500px] mx-auto px-3 flex items-center gap-1 overflow-x-auto scrollbar-none'>
						<button className='flex items-center gap-2 px-4 py-3 text-sm font-bold hover:bg-white/10 rounded-lg transition-all whitespace-nowrap'>
							<Menu
								size={
									16
								}
							/>
							All
						</button>

						{departments.map(
							(
								dept
							) => (
								<Link
									key={
										dept.href
									}
									to={
										dept.href
									}
									className='px-4 py-3 text-sm hover:bg-white/10 rounded-lg transition-all whitespace-nowrap'
								>
									{
										dept.label
									}
								</Link>
							)
						)}

						<Link
							to='/'
							className='ml-auto px-4 py-3 text-sm text-emerald-400 font-semibold hover:bg-white/10 rounded-lg transition-all whitespace-nowrap'
						>
							Today's
							Deals
						</Link>

						{isAdmin && (
							<Link
								to='/secret-dashboard'
								className='flex items-center gap-2 px-4 py-3 text-sm font-bold text-emerald-400 hover:bg-white/10 rounded-lg transition-all whitespace-nowrap'
							>
								<Lock
									size={
										15
									}
								/>
								Admin
							</Link>
						)}
					</div>
				</div>

				{/* MOBILE MENU CONTENT */}
				{mobileMenuOpen && (
					<div className='lg:hidden bg-[#101d2b] border-t border-white/5 px-4 py-4 space-y-3'>
						{!user ? (
							<div className='flex gap-2'>
								<Link
									to='/signup'
									className='flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl text-center'
								>
									Sign
									Up
								</Link>

								<Link
									to='/login'
									className='flex-1 bg-gray-700 text-white font-bold py-3 rounded-xl text-center'
								>
									Sign
									In
								</Link>
							</div>
						) : (
							<div className='space-y-2'>
								<Link
									to='/profile'
									className='w-full flex items-center justify-center gap-2 bg-[#1f2937] py-3 rounded-xl'
								>
									<User
										size={
											16
										}
									/>
									Profile
								</Link>

								<Link
									to='/addresses'
									className='w-full flex items-center justify-center gap-2 bg-[#1f2937] py-3 rounded-xl'
								>
									<MapPinned
										size={
											16
										}
									/>
									Addresses
								</Link>

								<button
									onClick={() => {
										logout();

										setMobileMenuOpen(
											false
										);
									}}
									className='w-full flex items-center justify-center gap-2 bg-gray-700 py-3 rounded-xl'
								>
									<LogOut
										size={
											16
										}
									/>
									Sign
									Out
								</button>
							</div>
						)}

						{departments.map(
							(
								dept
							) => (
								<Link
									key={
										dept.href
									}
									to={
										dept.href
									}
									onClick={() =>
										setMobileMenuOpen(
											false
										)
									}
									className='block py-2 text-sm text-gray-300 hover:text-emerald-400 border-b border-white/5'
								>
									{
										dept.label
									}
								</Link>
							)
						)}
					</div>
				)}
			</header>

			<div className='h-[96px]' />
		</>
	);
};

export default Navbar;