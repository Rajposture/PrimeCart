import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, Link } from "react-router-dom";

import {
	motion,
	AnimatePresence,
} from "framer-motion";

import {
	Search,
	SlidersHorizontal,
	Grid3X3,
	LayoutList,
	ArrowRight,
	Sparkles,
} from "lucide-react";

import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { fetchProductsByCategory, products } =
		useProductStore();

	const { category } = useParams();

	const [searchQuery, setSearchQuery] =
		useState("");

	const [sortOption, setSortOption] =
		useState("default");

	const [gridView, setGridView] = useState("grid");

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	/* FILTER + SORT */

	const filteredProducts = useMemo(() => {
		let filtered = [...products];

		/* SEARCH */
		filtered = filtered.filter((product) =>
			product.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
		);

		/* SORT */
		switch (sortOption) {
			case "low-high":
				filtered.sort(
					(a, b) => a.price - b.price
				);
				break;

			case "high-low":
				filtered.sort(
					(a, b) => b.price - a.price
				);
				break;

			case "a-z":
				filtered.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
				break;

			default:
				break;
		}

		return filtered;
	}, [products, searchQuery, sortOption]);

	return (
		<div className='min-h-screen bg-[#0b1120] text-white overflow-hidden'>
			{/* BACKGROUND */}
			<div className='absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-[#0b1120] to-cyan-900/10 z-0' />

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
				{/* HERO SECTION */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className='relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#111827] to-[#0f172a] p-10 mb-10'
				>
					<div className='absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full' />

					<div className='relative z-10'>
						<div className='flex items-center gap-3 mb-4'>


							<span className='text-emerald-400 font-medium uppercase tracking-[0.2em] text-sm'>
								PrimeCart Collection
							</span>
						</div>

						<h1 className='text-5xl sm:text-6xl font-black mb-4 capitalize'>
							{category}
						</h1>

						<p className='text-gray-400 text-lg max-w-2xl leading-relaxed'>
							Explore premium{" "}
							{category.toLowerCase()} collection
							with modern styles, top quality and
							exclusive offers only on PrimeCart.
						</p>
					</div>
				</motion.div>

				{/* TOP BAR */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8'
				>
					{/* SEARCH */}
					<div className='relative w-full lg:max-w-md'>
						<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />

						<input
							type='text'
							placeholder='Search products...'
							value={searchQuery}
							onChange={(e) =>
								setSearchQuery(
									e.target.value
								)
							}
							className='w-full bg-[#111827]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all'
						/>
					</div>

					<div className='flex flex-wrap items-center gap-4'>
						{/* SORT */}
						<div className='relative'>
							<SlidersHorizontal className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />

							<select
								value={sortOption}
								onChange={(e) =>
									setSortOption(
										e.target.value
									)
								}
								className='appearance-none bg-[#111827]/80 border border-white/10 rounded-2xl py-4 pl-11 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
							>
								<option value='default'>
									Default
								</option>

								<option value='low-high'>
									Price: Low to High
								</option>

								<option value='high-low'>
									Price: High to Low
								</option>

								<option value='a-z'>
									Name: A-Z
								</option>
							</select>
						</div>

						{/* GRID VIEW */}
						<div className='flex items-center bg-[#111827]/80 border border-white/10 rounded-2xl p-1'>
							<button
								onClick={() =>
									setGridView("grid")
								}
								className={`p-3 rounded-xl transition-all ${
									gridView === "grid"
										? "bg-emerald-500 text-black"
										: "text-gray-400"
								}`}
							>
								<Grid3X3 className='w-5 h-5' />
							</button>

							<button
								onClick={() =>
									setGridView("list")
								}
								className={`p-3 rounded-xl transition-all ${
									gridView === "list"
										? "bg-emerald-500 text-black"
										: "text-gray-400"
								}`}
							>
								<LayoutList className='w-5 h-5' />
							</button>
						</div>
					</div>
				</motion.div>

				{/* RESULTS */}
				<div className='flex items-center justify-between mb-6'>
					<div>
						<h2 className='text-2xl font-bold'>
							Products
						</h2>

						<p className='text-gray-400 mt-1'>
							Showing{" "}
							{filteredProducts.length} products
						</p>
					</div>

					<Link
						to='/'
						className='text-emerald-400 hover:text-emerald-300 flex items-center gap-2 font-medium'
					>
						Back to Home
						<ArrowRight className='w-4 h-4' />
					</Link>
				</div>

				{/* PRODUCTS GRID */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={gridView}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.4 }}
						className={`${
							gridView === "grid"
								? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
								: "flex flex-col gap-6"
						}`}
					>
						{filteredProducts?.length === 0 && (
							<div className='col-span-full flex flex-col items-center justify-center py-24 text-center'>
								<div className='w-24 h-24 rounded-full bg-[#111827] flex items-center justify-center mb-6 border border-white/10'>
									<Search className='w-10 h-10 text-gray-500' />
								</div>

								<h2 className='text-3xl font-bold text-white mb-3'>
									No Products Found
								</h2>

								<p className='text-gray-400 max-w-md'>
									We couldn't find any products
									matching your search or filter.
								</p>
							</div>
						)}

						{filteredProducts?.map((product) => (
							<motion.div
								key={product._id}
								layout
								initial={{
									opacity: 0,
									scale: 0.95,
								}}
								animate={{
									opacity: 1,
									scale: 1,
								}}
								transition={{
									duration: 0.3,
								}}
								className='transform hover:-translate-y-1 transition-all duration-300'
							>
								<ProductCard
									product={product}
								/>
							</motion.div>
						))}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default CategoryPage;