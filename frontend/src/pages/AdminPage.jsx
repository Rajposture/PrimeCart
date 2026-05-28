import {
	BarChart3,
	PlusCircle,
	ShoppingBasket,
	Package,
	TrendingUp,
	IndianRupee,
	Users,
	Search,
	Bell,
	LayoutDashboard,
	RefreshCcw,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{
		id: "dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
	},
	{
		id: "create",
		label: "Create Product",
		icon: PlusCircle,
	},
	{
		id: "products",
		label: "Products",
		icon: ShoppingBasket,
	},
	{
		id: "analytics",
		label: "Analytics",
		icon: BarChart3,
	},
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("dashboard");
	const [searchQuery, setSearchQuery] = useState("");

	const {
		fetchAllProducts,
		products,
		isLoading,
	} = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, []);

	/* REAL DATA CALCULATIONS */

	const totalProducts = products?.length || 0;

	const totalInventoryValue = useMemo(() => {
		return products?.reduce(
			(total, product) => total + product.price,
			0
		);
	}, [products]);

	const featuredProductsCount = useMemo(() => {
		return products?.filter((product) => product.isFeatured)?.length;
	}, [products]);

	const categoriesCount = useMemo(() => {
		const categories = new Set(
			products?.map((product) => product.category)
		);

		return categories.size;
	}, [products]);

	const filteredProducts = useMemo(() => {
		return products?.filter((product) =>
			product.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
		);
	}, [products, searchQuery]);

	return (
		<div className='min-h-screen bg-[#0b1120] text-white overflow-hidden'>
			{/* BACKGROUND */}
			<div className='absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-[#0b1120] to-cyan-900/10 z-0' />

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* TOP HEADER */}
				<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10'>
					<div>
						<h1 className='text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'>
							PrimeCart Admin
						</h1>

						<p className='text-gray-400 mt-2 text-lg'>
							Manage products, inventory and store analytics
						</p>
					</div>

					<div className='flex items-center gap-4'>
						<button
							onClick={fetchAllProducts}
							className='bg-[#111827] border border-white/10 hover:border-emerald-500/30 transition-all p-3 rounded-xl'
						>
							<RefreshCcw className='w-5 h-5 text-emerald-400' />
						</button>

						<button className='relative bg-[#111827] border border-white/10 p-3 rounded-xl'>
							<Bell className='w-5 h-5 text-yellow-400' />

							<span className='absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1'>
								2
							</span>
						</button>
					</div>
				</div>

				{/* SEARCH BAR */}
				<div className='relative mb-8'>
					<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />

					<input
						type='text'
						placeholder='Search products...'
						value={searchQuery}
						onChange={(e) =>
							setSearchQuery(e.target.value)
						}
						className='w-full bg-[#111827]/80 backdrop-blur-md border border-white/10 focus:border-emerald-500 outline-none rounded-2xl py-4 pl-12 pr-5 text-white'
					/>
				</div>

				{/* STATS */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10'>
					{/* TOTAL PRODUCTS */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='bg-[#111827]/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl'
					>
						<div className='flex items-center justify-between mb-4'>
							<div className='bg-emerald-500/15 p-3 rounded-2xl'>
								<Package className='text-emerald-400 w-6 h-6' />
							</div>

							<span className='text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full'>
								Live
							</span>
						</div>

						<h3 className='text-gray-400 text-sm mb-2'>
							Total Products
						</h3>

						<p className='text-4xl font-black'>
							{totalProducts}
						</p>
					</motion.div>


					{/* FEATURED PRODUCTS */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className='bg-[#111827]/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl'
					>
						<div className='flex items-center justify-between mb-4'>
							<div className='bg-cyan-500/15 p-3 rounded-2xl'>
								<ShoppingBasket className='text-cyan-400 w-6 h-6' />
							</div>

							<span className='text-xs text-cyan-400'>
								Featured
							</span>
						</div>

						<h3 className='text-gray-400 text-sm mb-2'>
							Featured Products
						</h3>

						<p className='text-4xl font-black'>
							{featuredProductsCount}
						</p>
					</motion.div>

					{/* CATEGORIES */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className='bg-[#111827]/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl'
					>
						<div className='flex items-center justify-between mb-4'>
							<div className='bg-purple-500/15 p-3 rounded-2xl'>
								<Users className='text-purple-400 w-6 h-6' />
							</div>

							<span className='text-xs text-purple-400'>
								Store
							</span>
						</div>

						<h3 className='text-gray-400 text-sm mb-2'>
							Categories
						</h3>

						<p className='text-4xl font-black'>
							{categoriesCount}
						</p>
					</motion.div>
				</div>

				{/* TABS */}
				<div className='flex flex-wrap gap-3 mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 border ${
								activeTab === tab.id
									? "bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/20"
									: "bg-[#111827]/80 border-white/10 text-gray-300 hover:border-emerald-500/30"
							}`}
						>
							<tab.icon className='w-5 h-5' />
							{tab.label}
						</button>
					))}
				</div>

				{/* TAB CONTENT */}
				<div className='bg-[#111827]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6'>
					<AnimatePresence mode='wait'>
						{activeTab === "dashboard" && (
							<motion.div
								key='dashboard'
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -15 }}
							>
								<div className='flex items-center justify-between mb-6'>
									<div>
										<h2 className='text-2xl font-bold'>
											Recent Products
										</h2>

										<p className='text-gray-400 mt-1'>
											Latest inventory updates
										</p>
									</div>

									<p className='text-sm text-gray-400'>
										{filteredProducts?.length} products
									</p>
								</div>

								<div className='space-y-4'>
									{filteredProducts
										?.slice(0, 6)
										.map((product) => (
											<div
												key={product._id}
												className='flex items-center justify-between bg-[#0f172a] border border-white/5 rounded-2xl p-4 hover:border-emerald-500/20 transition-all'
											>
												<div className='flex items-center gap-4'>
													<img
														src={product.image}
														alt={product.name}
														className='w-16 h-16 rounded-xl object-cover'
													/>

													<div>
														<h3 className='font-semibold text-lg'>
															{product.name}
														</h3>

														<p className='text-gray-400 text-sm capitalize'>
															{
																product.category
															}
														</p>
													</div>
												</div>

												<div className='text-right'>
													<p className='text-emerald-400 font-bold text-lg'>
														₹
														{
															product.price
														}
													</p>

													{product.isFeatured && (
														<span className='text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full'>
															Featured
														</span>
													)}
												</div>
											</div>
										))}
								</div>
							</motion.div>
						)}

						{activeTab === "create" && (
							<motion.div
								key='create'
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -15 }}
							>
								<CreateProductForm />
							</motion.div>
						)}

						{activeTab === "products" && (
							<motion.div
								key='products'
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -15 }}
							>
								<ProductsList />
							</motion.div>
						)}

						{activeTab === "analytics" && (
							<motion.div
								key='analytics'
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -15 }}
							>
								<AnalyticsTab />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default AdminPage;