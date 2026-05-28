import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
	ChevronLeft,
	ChevronRight,
	ArrowRight,
	Star,
	Truck,
	ShieldCheck,
	BadgePercent,
	Zap,
} from "lucide-react";

import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const heroSlides = [
	{
		title: "New Fashion Collection",
		subtitle: "Discover premium styles for every season",
		image:
			"https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
	},
	{
		title: "Summer Sale 2026",
		subtitle: "Up to 70% OFF on trending products",
		image:
			"https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop",
	},
	{
		title: "Premium Accessories",
		subtitle: "Complete your perfect look",
		image:
			"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
	},
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	const [currentSlide, setCurrentSlide] = useState(0);

	const sliderRef = useRef(null);

	useEffect(() => {
		fetchFeaturedProducts();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) =>
				prev === heroSlides.length - 1 ? 0 : prev + 1
			);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const nextSlide = () => {
		setCurrentSlide((prev) =>
			prev === heroSlides.length - 1 ? 0 : prev + 1
		);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) =>
			prev === 0 ? heroSlides.length - 1 : prev - 1
		);
	};

	return (
		<div className='relative min-h-screen bg-[#070b14] text-white overflow-hidden'>
			{/* Background Gradient */}
			<div className='absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-[#070b14] to-sky-900/20 z-0' />

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* HERO SECTION */}
				<div className='relative h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/10'>
					<img
						src={heroSlides[currentSlide].image}
						alt='banner'
						className='w-full h-full object-cover'
					/>

					<div className='absolute inset-0 bg-black/55' />

					<div className='absolute inset-0 flex flex-col justify-center px-10 sm:px-16'>
						<span className='bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-1 rounded-full text-sm w-fit mb-4 backdrop-blur-md'>
							PrimeCart Exclusive
						</span>

						<h1 className='text-5xl sm:text-6xl font-black max-w-2xl leading-tight mb-4'>
							{heroSlides[currentSlide].title}
						</h1>

						<p className='text-gray-300 text-lg max-w-xl mb-8'>
							{heroSlides[currentSlide].subtitle}
						</p>

						<div className='flex gap-4'>
							<Link
								to='/'
								className='bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2'
							>
								Shop Now <ArrowRight size={18} />
							</Link>

							<Link
								to='/'
								className='border border-white/20 hover:border-white/40 backdrop-blur-md px-8 py-4 rounded-xl transition-all duration-300'
							>
								Explore
							</Link>
						</div>
					</div>

					{/* Slider Buttons */}
					<button
						onClick={prevSlide}
						className='absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 p-3 rounded-full backdrop-blur-md'
					>
						<ChevronLeft />
					</button>

					<button
						onClick={nextSlide}
						className='absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 p-3 rounded-full backdrop-blur-md'
					>
						<ChevronRight />
					</button>

					{/* Dots */}
					<div className='absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2'>
						{heroSlides.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentSlide(index)}
								className={`h-2 rounded-full transition-all duration-300 ${
									currentSlide === index
										? "w-8 bg-emerald-400"
										: "w-2 bg-white/40"
								}`}
							/>
						))}
					</div>
				</div>

				{/* TRUST BADGES */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
					<div className='bg-[#111827] border border-white/5 rounded-2xl p-5 flex items-center gap-4'>
						<Truck className='text-emerald-400' />
						<div>
							<h3 className='font-semibold'>Free Delivery</h3>
							<p className='text-gray-400 text-sm'>
								On orders above ₹999
							</p>
						</div>
					</div>

					<div className='bg-[#111827] border border-white/5 rounded-2xl p-5 flex items-center gap-4'>
						<ShieldCheck className='text-sky-400' />
						<div>
							<h3 className='font-semibold'>Secure Payments</h3>
							<p className='text-gray-400 text-sm'>
								100% protected checkout
							</p>
						</div>
					</div>

					<div className='bg-[#111827] border border-white/5 rounded-2xl p-5 flex items-center gap-4'>
						<BadgePercent className='text-yellow-400' />
						<div>
							<h3 className='font-semibold'>Best Deals</h3>
							<p className='text-gray-400 text-sm'>
								Save more everyday
							</p>
						</div>
					</div>

					<div className='bg-[#111827] border border-white/5 rounded-2xl p-5 flex items-center gap-4'>
						<Zap className='text-purple-400' />
						<div>
							<h3 className='font-semibold'>Fast Shopping</h3>
							<p className='text-gray-400 text-sm'>
								Smooth experience
							</p>
						</div>
					</div>
				</div>

				{/* CATEGORY SECTION */}
				<div className='flex items-center justify-between mb-6'>
					<div>
						<h2 className='text-3xl font-black text-white'>
							Shop by Category
						</h2>

						<p className='text-gray-400 mt-1'>
							Explore premium collections
						</p>
					</div>

					<Link
						to='/categories'
						className='text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium'
					>
						See all <ArrowRight size={16} />
					</Link>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16'>
					{categories.map((category) => (
						<div
							key={category.name}
							className='transform hover:-translate-y-2 transition-all duration-300'
						>
							<CategoryItem category={category} />
						</div>
					))}
				</div>

				{/* FEATURED PRODUCTS */}
				{!isLoading && products?.length > 0 && (
					<div className='mb-16'>
						<div className='flex items-center justify-between mb-6'>
							<div>
								<h2 className='text-3xl font-black'>
									Featured Products
								</h2>

								<p className='text-gray-400 mt-1'>
									Trending products picked for you
								</p>
							</div>

							<div className='flex items-center gap-2 text-yellow-400'>
								<Star fill='currentColor' size={18} />
								<span className='font-semibold'>Top Rated</span>
							</div>
						</div>

						<FeaturedProducts featuredProducts={products} />
					</div>
				)}

				{/* MEMBERSHIP BANNER */}
				<div className='relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900/30 to-sky-900/30 p-10'>
					<div className='absolute inset-0 backdrop-blur-3xl' />

					<div className='relative z-10 text-center'>
						<p className='text-emerald-400 uppercase tracking-[0.3em] text-sm font-bold mb-3'>
							Premium Membership
						</p>

						<h2 className='text-4xl sm:text-5xl font-black mb-4'>
							Unlock Exclusive Benefits
						</h2>

						<p className='text-gray-300 max-w-2xl mx-auto mb-8 text-lg'>
							Get free shipping, exclusive discounts, and early
							access to the newest collections only on PrimeCart.
						</p>

						<Link
							to='/signup'
							className='inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-10 py-4 rounded-2xl transition-all duration-300'
						>
							Join Now <ArrowRight size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;