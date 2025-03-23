import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export default function AdminPage() {
	const [restaurants, setRestaurants] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		return localStorage.getItem("adminLoggedIn") === "true";
	});
	const [loginData, setLoginData] = useState({ username: "", password: "" });
	const [restaurantOffers, setRestaurantOffers] = useState([]);
	const [showOffers, setShowOffers] = useState(false);
	const [selectedRestaurant, setSelectedRestaurant] = useState(null);
	const [logoFile, setLogoFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [newOffer, setNewOffer] = useState({
		title: "",
		description: "",
		offerType: "",
		validOn: [],
		expiryDate: "",
	});

	const ADMIN_USERNAME = "admin";
	const ADMIN_PASSWORD = "mealmates123";

	useEffect(() => {
		if (isAuthenticated) {
			setIsLoading(true);
			fetch(
				"http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants"
			)
				.then((res) => res.json())
				.then((data) => {
					setRestaurants(data);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching restaurants:", error);
					setIsLoading(false);
				});
		}
	}, [isAuthenticated]);

	const handleLogin = (e) => {
		e.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			if (
				loginData.username === ADMIN_USERNAME &&
				loginData.password === ADMIN_PASSWORD
			) {
				localStorage.setItem("adminLoggedIn", "true");
				setIsAuthenticated(true);
			} else {
				alert("Invalid credentials");
			}
			setIsLoading(false);
		}, 500);
	};

	const handleLogout = () => {
		localStorage.removeItem("adminLoggedIn");
		setIsAuthenticated(false);
	};

	const handleLoginInputChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prev) => ({ ...prev, [name]: value }));
	};

	const openModal = (restaurant) => {
		setSelectedRestaurant({ ...restaurant });
		setShowOffers(false);
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setSelectedRestaurant((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleOfferChange = (e) => {
		const { name, value } = e.target;
		setNewOffer((prev) => ({ ...prev, [name]: value }));
	};

	const fetchOffers = async (restaurantId) => {
		try {
			setIsLoading(true);
			const res = await fetch(
				`http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants/${restaurantId}/offers`
			);
			const data = await res.json();
			setRestaurantOffers(data);
			setShowOffers(true);
			setIsLoading(false);
		} catch (err) {
			console.error("Error fetching offers:", err);
			setIsLoading(false);
		}
	};

	const addOffer = async () => {
		if (!newOffer.title || !newOffer.description) {
			alert("Please fill all required offer fields.");
			return;
		}

		setIsLoading(true);
		try {
			const res = await fetch(
				`http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants/${selectedRestaurant.id}/offers`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newOffer),
				}
			);

			if (res.ok) {
				alert("Offer added successfully!");
				setNewOffer({
					title: "",
					description: "",
					offerType: "",
					validOn: [],
					expiryDate: "",
				});
				// Refresh offers list
				fetchOffers(selectedRestaurant.id);
			} else {
				alert("Failed to add offer. Please try again.");
			}
		} catch (error) {
			console.error("Error adding offer:", error);
			alert("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSave = async () => {
		setIsLoading(true);
		try {
			let logoUrl = selectedRestaurant.logo;

			if (logoFile) {
				const fileRef = ref(
					storage,
					`restaurantLogos/${selectedRestaurant.id}_${logoFile.name}`
				);
				const snapshot = await uploadBytes(fileRef, logoFile);
				logoUrl = await getDownloadURL(snapshot.ref);
			}

			const updatedData = {
				...selectedRestaurant,
				logo: logoUrl,
			};

			const response = await fetch(
				`http://localhost:5001/saltifi-production/us-central1/MealMatesApi/update-restaurant/${selectedRestaurant.id}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedData),
				}
			);

			if (response.ok) {
				setRestaurants((prev) =>
					prev.map((r) => (r.id === selectedRestaurant.id ? updatedData : r))
				);
				alert("Restaurant updated successfully!");
				setSelectedRestaurant(null);
				setLogoFile(null);
			} else {
				alert("Failed to update restaurant. Please try again.");
			}
		} catch (error) {
			console.error("Error updating restaurant:", error);
			alert("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	if (!isAuthenticated) {
		return (
			<div className='flex min-h-screen bg-secondary items-center justify-center'>
				<div className='bg-white rounded-xl shadow-sm p-8 w-full max-w-md'>
					<h2 className='text-2xl font-bold text-accent mb-6 text-center'>
						Admin Login
					</h2>

					<form
						onSubmit={handleLogin}
						className='space-y-6'>
						<div>
							<label
								htmlFor='username'
								className='block text-sm font-medium text-accent mb-1'>
								Username
							</label>
							<input
								id='username'
								type='text'
								name='username'
								className='w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
								placeholder='Enter your username'
								value={loginData.username}
								onChange={handleLoginInputChange}
								required
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-accent mb-1'>
								Password
							</label>
							<input
								id='password'
								type='password'
								name='password'
								className='w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
								placeholder='Enter your password'
								value={loginData.password}
								onChange={handleLoginInputChange}
								required
							/>
						</div>

						<button
							type='submit'
							disabled={isLoading}
							className={`w-full px-6 py-3 bg-primary text-white rounded-lg transition duration-150 flex items-center justify-center shadow-sm ${
								isLoading
									? "opacity-70 cursor-not-allowed"
									: "hover:bg-primary-light"
							}`}>
							{isLoading ? (
								<>
									<svg
										className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
										fill='none'
										viewBox='0 0 24 24'>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
									</svg>
									Logging in...
								</>
							) : (
								"Login"
							)}
						</button>
					</form>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-secondary pb-10'>
			<div className='bg-white shadow-sm'>
				<div className='container mx-auto px-4 py-4 flex justify-between items-center'>
					<h1 className='text-2xl font-bold text-accent'>MealMates Admin</h1>
					<button
						onClick={handleLogout}
						className='px-4 py-2 bg-secondary text-accent rounded-md hover:bg-secondary-dark transition duration-150'>
						Logout
					</button>
				</div>
			</div>

			<div className='container mx-auto px-4 py-6'>
				<div className='bg-white rounded-xl shadow-sm p-6'>
					<h2 className='text-xl font-semibold text-accent mb-4'>
						All Restaurants
					</h2>

					{isLoading && !selectedRestaurant ? (
						<div className='text-center py-8'>
							<div className='animate-spin inline-block h-8 w-8 rounded-full border-4 border-secondary border-t-primary'></div>
							<p className='mt-2 text-accent-light'>Loading restaurants...</p>
						</div>
					) : restaurants.length === 0 ? (
						<p className='text-accent-light py-4'>No restaurants found.</p>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
							{restaurants.map((restaurant) => (
								<div
									key={restaurant.id}
									className='p-4 border border-secondary rounded-lg hover:bg-secondary transition duration-150 cursor-pointer'
									onClick={() => openModal(restaurant)}>
									<div className='flex items-center'>
										<div className='h-12 w-12 rounded-md overflow-hidden bg-secondary-light flex-shrink-0'>
											{restaurant.logo ? (
												<img
													src={restaurant.logo}
													alt=''
													className='h-full w-full object-cover'
												/>
											) : (
												<div className='h-full w-full flex items-center justify-center bg-primary text-white font-bold'>
													{restaurant.restaurantName.charAt(0).toUpperCase()}
												</div>
											)}
										</div>
										<div className='ml-3'>
											<h3 className='font-medium text-accent'>
												{restaurant.restaurantName}
											</h3>
											<p className='text-sm text-accent-light'>
												{restaurant.city || restaurant.address}
											</p>
										</div>
									</div>
									{restaurant.verified && (
										<span className='inline-block mt-2 text-xs px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-full'>
											Verified
										</span>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Restaurant Edit Modal */}
			{selectedRestaurant && (
				<div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
					<div className='bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
						<div className='p-6'>
							<div className='flex justify-between items-center mb-6'>
								<h2 className='text-xl font-semibold text-accent'>
									{selectedRestaurant.restaurantName}
								</h2>
								<button
									onClick={() => {
										setSelectedRestaurant(null);
										setRestaurantOffers([]);
										setShowOffers(false);
									}}
									className='text-accent-light hover:text-accent'>
									<svg
										className='w-5 h-5'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M6 18L18 6M6 6l12 12'
										/>
									</svg>
								</button>
							</div>

							<div className='space-y-6'>
								<div>
									<label className='block text-sm font-medium text-accent mb-1'>
										Owner/Manager
									</label>
									<input
										type='text'
										name='name'
										value={selectedRestaurant.name || ""}
										onChange={handleChange}
										className='w-full px-3 py-2 border border-secondary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-accent mb-1'>
										Contact
									</label>
									<input
										type='text'
										name='contact'
										value={selectedRestaurant.contact || ""}
										onChange={handleChange}
										className='w-full px-3 py-2 border border-secondary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-accent mb-1'>
										Email
									</label>
									<input
										type='email'
										name='email'
										value={selectedRestaurant.email || ""}
										onChange={handleChange}
										className='w-full px-3 py-2 border border-secondary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-accent mb-1'>
										Address
									</label>
									<textarea
										name='address'
										value={selectedRestaurant.address || ""}
										onChange={handleChange}
										rows='3'
										className='w-full px-3 py-2 border border-secondary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
									/>
								</div>

								<div className='flex items-center'>
									<input
										id='verified'
										type='checkbox'
										name='verified'
										checked={selectedRestaurant.verified || false}
										onChange={handleChange}
										className='h-4 w-4 text-primary border-secondary-dark rounded focus:ring-primary'
									/>
									<label
										htmlFor='verified'
										className='ml-2 block text-sm text-accent'>
										Verified Restaurant
									</label>
								</div>

								<div>
									<label className='block text-sm font-medium text-accent mb-1'>
										Restaurant Logo
									</label>
									<div className='flex items-center space-x-4'>
										<div className='h-16 w-16 rounded-md overflow-hidden bg-secondary-light'>
											{selectedRestaurant.logo || logoFile ? (
												<img
													src={
														logoFile
															? URL.createObjectURL(logoFile)
															: selectedRestaurant.logo
													}
													alt=''
													className='h-full w-full object-cover'
												/>
											) : (
												<div className='h-full w-full flex items-center justify-center bg-primary text-white font-bold'>
													{selectedRestaurant.restaurantName
														?.charAt(0)
														.toUpperCase() || "L"}
												</div>
											)}
										</div>
										<div className='flex-grow'>
											<input
												type='file'
												onChange={(e) => setLogoFile(e.target.files[0])}
												className='block w-full text-sm text-accent-light file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-accent hover:file:bg-secondary-dark'
											/>
										</div>
									</div>
								</div>

								<div className='flex space-x-3'>
									<button
										onClick={handleSave}
										disabled={isLoading}
										className={`px-4 py-2 bg-primary text-white rounded-md flex items-center ${
											isLoading
												? "opacity-70 cursor-not-allowed"
												: "hover:bg-primary-light"
										} transition duration-150`}>
										{isLoading ? (
											<svg
												className='animate-spin h-4 w-4 mr-2'
												fill='none'
												viewBox='0 0 24 24'>
												<circle
													className='opacity-25'
													cx='12'
													cy='12'
													r='10'
													stroke='currentColor'
													strokeWidth='4'></circle>
												<path
													className='opacity-75'
													fill='currentColor'
													d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
											</svg>
										) : (
											<svg
												className='w-4 h-4 mr-2'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M5 13l4 4L19 7'
												/>
											</svg>
										)}
										Save Changes
									</button>
									<button
										onClick={() => fetchOffers(selectedRestaurant.id)}
										disabled={isLoading}
										className={`px-4 py-2 bg-secondary text-accent rounded-md ${
											isLoading
												? "opacity-70 cursor-not-allowed"
												: "hover:bg-secondary-dark"
										} transition duration-150`}>
										{showOffers ? "Hide Offers" : "View Offers"}
									</button>
								</div>
							</div>

							{/* Offers Section */}
							{showOffers && (
								<div className='mt-8 pt-6 border-t border-secondary'>
									<h3 className='text-lg font-semibold text-accent mb-4'>
										Offers
									</h3>

									{isLoading ? (
										<div className='text-center py-4'>
											<div className='animate-spin inline-block h-6 w-6 rounded-full border-4 border-secondary border-t-primary'></div>
											<p className='mt-2 text-accent-light'>
												Loading offers...
											</p>
										</div>
									) : restaurantOffers.length === 0 ? (
										<p className='text-accent-light py-2'>
											No offers found for this restaurant.
										</p>
									) : (
										<div className='space-y-4'>
											{restaurantOffers.map((offer, idx) => (
												<div
													key={idx}
													className='p-4 border border-secondary rounded-lg'>
													<h4 className='font-medium text-accent'>
														{offer.title}
													</h4>
													<p className='text-sm text-accent-light mt-1'>
														{offer.description}
													</p>
													<div className='flex flex-wrap gap-2 mt-2'>
														{offer.offerType && (
															<span className='text-xs px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-full'>
																{offer.offerType}
															</span>
														)}
														<span className='text-xs px-2 py-1 bg-secondary text-accent-light rounded-full'>
															Expires:{" "}
															{new Date(offer.expiryDate).toLocaleDateString()}
														</span>
													</div>
													<p className='text-xs text-accent-light mt-2'>
														Valid on:{" "}
														{Array.isArray(offer.validOn)
															? offer.validOn.join(", ")
															: offer.validOn}
													</p>
												</div>
											))}
										</div>
									)}

									{/* Add Offer Form */}
									<div className='mt-8 pt-6 border-t border-secondary'>
										<h3 className='text-lg font-semibold text-accent mb-4'>
											Add New Offer
										</h3>
										<div className='space-y-4'>
											<div>
												<label className='block text-sm font-medium text-accent mb-1'>
													Title
												</label>
												<input
													type='text'
													name='title'
													placeholder='e.g. Weekend Special'
													value={newOffer.title}
													onChange={handleOfferChange}
													className='w-full px-3 py-2 border border-secondary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
												/>
											</div>

											<div>
												<label className='block text-sm font-medium text-accent mb-1'>
													Description
												</label>
												<textarea
													name='description'
													placeholder='Describe the offer details'
													value={newOffer.description}
													onChange={handleOfferChange}
													rows='3'
													className='w-full px-3 py-2 border border-secondary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
												/>
											</div>

											<div>
												<label className='block text-sm font-medium text-accent mb-1'>
													Offer Type
												</label>
												<select
													name='offerType'
													value={newOffer.offerType}
													onChange={handleOfferChange}
													className='w-full px-3 py-2 border border-secondary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white'>
													<option value=''>Select Offer Type</option>
													<option value='Combo'>Combo</option>
													<option value='Discount Offer'>Discount Offer</option>
													<option value='Buffet'>Buffet</option>
													<option value='Specials'>Specials</option>
												</select>
											</div>

											<div>
												<label className='block text-sm font-medium text-accent mb-1'>
													Valid On (Hold Ctrl/Cmd to select multiple)
												</label>
												<select
													multiple
													name='validOn'
													value={newOffer.validOn}
													onChange={(e) => {
														const options = Array.from(
															e.target.selectedOptions,
															(option) => option.value
														);
														setNewOffer((prev) => ({
															...prev,
															validOn: options,
														}));
													}}
													className='w-full px-3 py-2 border border-secondary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white h-32'>
													<option value='Weekday'>Weekday</option>
													<option value='Monday'>Monday</option>
													<option value='Tuesday'>Tuesday</option>
													<option value='Wednesday'>Wednesday</option>
													<option value='Thursday'>Thursday</option>
													<option value='Friday'>Friday</option>
													<option value='Weekends'>Weekends</option>
													<option value='Saturday'>Saturday</option>
													<option value='Sunday'>Sunday</option>
												</select>
											</div>

											<div>
												<label className='block text-sm font-medium text-accent mb-1'>
													Expiry Date
												</label>
												<input
													type='date'
													name='expiryDate'
													value={newOffer.expiryDate}
													onChange={handleOfferChange}
													className='w-full px-3 py-2 border border-secondary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
												/>
											</div>

											<button
												onClick={addOffer}
												disabled={isLoading}
												className={`px-4 py-2 bg-primary text-white rounded-md ${
													isLoading
														? "opacity-70 cursor-not-allowed"
														: "hover:bg-primary-light"
												} transition duration-150`}>
												{isLoading ? "Adding..." : "Add Offer"}
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
