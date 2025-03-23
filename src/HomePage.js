import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function HomePage() {
	const [searchText, setSearchText] = useState("");
	const [restaurants, setRestaurants] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedSpecialities, setSelectedSpecialities] = useState([]);
	const [selectedOffers, setSelectedOffers] = useState([]);
	const [selectedCities, setSelectedCities] = useState([]);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const navigate = useNavigate();
	const filterRef = useRef(null);

	const handleCheckboxChange = (value, setState, state) => {
		setState(
			state.includes(value)
				? state.filter((item) => item !== value)
				: [...state, value]
		);
	};

	const clearFilters = () => {
		setSelectedSpecialities([]);
		setSelectedOffers([]);
		setSelectedCities([]);
	};

	// Fetch restaurant data with proper loading states
	useEffect(() => {
		setLoading(true);
		fetch(
			"http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants"
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				const verifiedOnly = data.filter((r) => r.verified);
				setRestaurants(verifiedOnly);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching restaurants:", error);
				setError(error.message);
				setLoading(false);
			});
	}, []);

	const filteredRestaurants = restaurants.filter((restaurant) => {
		const matchesSearch =
			restaurant.restaurantName
				.toLowerCase()
				.includes(searchText.toLowerCase()) ||
			restaurant.address?.toLowerCase().includes(searchText.toLowerCase()) ||
			restaurant.city?.toLowerCase().includes(searchText.toLowerCase());

		const matchesSpeciality =
			selectedSpecialities.length === 0 ||
			selectedSpecialities.includes(restaurant.speciality);

		const matchesOffer =
			selectedOffers.length === 0 ||
			restaurant.offers?.some((offer) => selectedOffers.includes(offer.type));

		const matchesCity =
			selectedCities.length === 0 || selectedCities.includes(restaurant.city);

		return matchesSearch && matchesSpeciality && matchesOffer && matchesCity;
	});

	// Create a placeholder image with the first letter of restaurant name
	const getPlaceholderImage = (name) => {
		// Using colors from the config - shades of black
		const colors = ["#000000", "#333333", "#0f0f0f"];
		const index = name.charCodeAt(0) % colors.length;
		const bgColor = colors[index];

		return (
			<div
				className='w-full h-full flex items-center justify-center'
				style={{ backgroundColor: bgColor }}>
				<span className='text-white text-4xl font-bold'>
					{name.charAt(0).toUpperCase()}
				</span>
			</div>
		);
	};

	return (
		<div className='flex flex-col min-h-screen bg-secondary'>
			<Header />

			<main className='container mx-auto px-4 sm:px-6 py-8 flex-grow'>
				{/* Search and Filter Bar */}
				<div className='max-w-5xl mx-auto'>
					<div className='flex flex-col md:flex-row md:items-center gap-3 mb-8'>
						<div className='relative flex-grow'>
							<input
								type='text'
								className='w-full px-4 py-3 pl-10 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
								placeholder='Search restaurants, cuisines, or locations...'
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
							/>
							<svg
								className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent-light'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
						</div>

						<button
							className='px-5 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition duration-150 flex items-center justify-center shadow-sm'
							onClick={() => setIsFilterOpen(!isFilterOpen)}>
							<svg
								className='h-5 w-5 mr-2'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
								/>
							</svg>
							Filter
							{selectedSpecialities.length +
								selectedOffers.length +
								selectedCities.length >
								0 && (
								<span className='ml-2 bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold'>
									{selectedSpecialities.length +
										selectedOffers.length +
										selectedCities.length}
								</span>
							)}
						</button>
					</div>

					{/* Filter Panel */}
					{isFilterOpen && (
						<div
							className='bg-white rounded-lg shadow-lg p-5 mb-8 border border-secondary'
							ref={filterRef}
							style={{
								animation: "fadeIn 0.2s ease-out forwards",
							}}>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
								<div className='filter-section'>
									<h4 className='font-medium text-accent text-lg mb-4'>
										Speciality
									</h4>
									<div className='space-y-3'>
										{[
											"Indian",
											"North Indian",
											"South Indian",
											"Maharashtrian",
										].map((type) => (
											<label
												key={type}
												className='flex items-center text-accent-light hover:text-accent cursor-pointer group'>
												<input
													type='checkbox'
													className='form-checkbox h-5 w-5 text-primary rounded border-secondary-dark focus:ring-primary'
													checked={selectedSpecialities.includes(type)}
													onChange={() =>
														handleCheckboxChange(
															type,
															setSelectedSpecialities,
															selectedSpecialities
														)
													}
												/>
												<span className='ml-3 group-hover:text-accent transition-colors'>
													{type}
												</span>
											</label>
										))}
									</div>
								</div>

								<div className='filter-section'>
									<h4 className='font-medium text-accent text-lg mb-4'>
										Offer Type
									</h4>
									<div className='space-y-3'>
										{["Combos", "Buy 1 Get 1", "Buffet"].map((offer) => (
											<label
												key={offer}
												className='flex items-center text-accent-light hover:text-accent cursor-pointer group'>
												<input
													type='checkbox'
													className='form-checkbox h-5 w-5 text-primary rounded border-secondary-dark focus:ring-primary'
													checked={selectedOffers.includes(offer)}
													onChange={() =>
														handleCheckboxChange(
															offer,
															setSelectedOffers,
															selectedOffers
														)
													}
												/>
												<span className='ml-3 group-hover:text-accent transition-colors'>
													{offer}
												</span>
											</label>
										))}
									</div>
								</div>

								<div className='filter-section'>
									<h4 className='font-medium text-accent text-lg mb-4'>City</h4>
									<div className='space-y-3'>
										{["Mumbai", "Pune", "Bangalore", "Delhi"].map((city) => (
											<label
												key={city}
												className='flex items-center text-accent-light hover:text-accent cursor-pointer group'>
												<input
													type='checkbox'
													className='form-checkbox h-5 w-5 text-primary rounded border-secondary-dark focus:ring-primary'
													checked={selectedCities.includes(city)}
													onChange={() =>
														handleCheckboxChange(
															city,
															setSelectedCities,
															selectedCities
														)
													}
												/>
												<span className='ml-3 group-hover:text-accent transition-colors'>
													{city}
												</span>
											</label>
										))}
									</div>
								</div>
							</div>

							<div className='flex justify-end space-x-4 mt-6 pt-4 border-t border-secondary'>
								<button
									className='px-4 py-2 text-accent-light hover:text-accent font-medium transition duration-150'
									onClick={clearFilters}>
									Clear All
								</button>
								<button
									className='px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition duration-150 shadow-sm'
									onClick={() => setIsFilterOpen(false)}>
									Apply Filters
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Loading State */}
				{loading && (
					<div className='text-center py-12'>
						<div className='animate-pulse inline-block h-8 w-8 rounded-full bg-primary opacity-75 mb-4'></div>
						<p className='text-accent-light'>Loading restaurants...</p>
					</div>
				)}

				{/* Error State */}
				{error && !loading && (
					<div className='text-center py-12 max-w-md mx-auto'>
						<svg
							className='h-12 w-12 text-primary-light mx-auto mb-4'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<h3 className='text-lg font-medium text-accent mb-2'>
							Unable to load restaurants
						</h3>
						<p className='text-accent-light mb-4'>
							There was a problem connecting to our servers. Please try again
							later.
						</p>
						<button
							onClick={() => window.location.reload()}
							className='px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition duration-150'>
							Retry
						</button>
					</div>
				)}

				{/* Restaurant Grid */}
				{!loading && !error && (
					<div className='max-w-7xl mx-auto'>
						{filteredRestaurants.length > 0 ? (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
								{filteredRestaurants.map((restaurant) => (
									<div
										key={restaurant.restaurantName}
										className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer group'
										onClick={() => navigate(`/${restaurant.restaurantName}`)}>
										{/* Image Section with Aspect Ratio Container */}
										<div className='relative pb-[60%] overflow-hidden bg-secondary-light'>
											{restaurant.logo ? (
												<img
													src={restaurant.logo}
													alt={restaurant.restaurantName}
													className='absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
													onError={(e) => {
														e.target.style.display = "none";
														e.target.parentNode.appendChild(
															document
																.createRange()
																.createContextualFragment(
																	`<div class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary text-white text-4xl font-bold">${restaurant.restaurantName
																		.charAt(0)
																		.toUpperCase()}</div>`
																)
														);
													}}
												/>
											) : (
												getPlaceholderImage(restaurant.restaurantName)
											)}

											{/* City Tag Overlay */}
											{restaurant.city && (
												<div className='absolute top-3 right-3'>
													<span className='inline-block px-3 py-1 bg-white bg-opacity-90 text-xs font-medium text-accent rounded-full shadow-sm'>
														{restaurant.city}
													</span>
												</div>
											)}
										</div>

										{/* Content Section */}
										<div className='p-5'>
											<h3 className='text-lg font-semibold text-accent mb-1 group-hover:text-primary-light transition-colors duration-200'>
												{restaurant.restaurantName}
											</h3>

											<p className='text-accent-light text-sm mb-3 line-clamp-2'>
												{restaurant.address ||
													"Location information unavailable"}
											</p>

											{/* Tags Section */}
											<div className='flex flex-wrap gap-2 mb-2'>
												{restaurant.speciality && (
													<span className='inline-block px-2 py-1 bg-secondary rounded-md text-xs font-medium text-accent-light'>
														{restaurant.speciality}
													</span>
												)}

												{/* Show first 2 offers if available */}
												{restaurant.offers &&
													restaurant.offers.slice(0, 2).map((offer, index) => (
														<span
															key={index}
															className='inline-block px-2 py-1 bg-secondary-dark bg-opacity-30 rounded-md text-xs font-medium text-accent'>
															{offer.type}
														</span>
													))}
											</div>

											{/* Offers Count */}
											{restaurant.offers && restaurant.offers.length > 0 && (
												<div className='flex items-center mt-3 pt-3 border-t border-secondary'>
													<svg
														className='h-4 w-4 text-primary mr-2'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth='2'
															d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
														/>
													</svg>
													<span className='text-xs text-primary-light font-medium'>
														{restaurant.offers.length} offer
														{restaurant.offers.length > 1 ? "s" : ""} available
													</span>
												</div>
											)}
										</div>
									</div>
								))}
							</div>
						) : (
							<div className='py-16 text-center max-w-md mx-auto'>
								<svg
									className='mx-auto h-16 w-16 text-accent-light mb-4'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
								<h3 className='text-lg font-medium text-accent mb-2'>
									No restaurants found
								</h3>
								<p className='text-accent-light mb-6'>
									Try adjusting your search or filters to find what you're
									looking for.
								</p>

								{(selectedSpecialities.length > 0 ||
									selectedOffers.length > 0 ||
									selectedCities.length > 0) && (
									<button
										onClick={clearFilters}
										className='px-4 py-2 bg-secondary hover:bg-secondary-dark text-accent font-medium rounded-md transition duration-150'>
										Clear all filters
									</button>
								)}
							</div>
						)}
					</div>
				)}
			</main>
		</div>
	);
}
