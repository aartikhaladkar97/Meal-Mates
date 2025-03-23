import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import RestaurantDetailHeader from "./RestaurantDetailHeader";
import RestaurantOffersBody from "./RestaurantOffersBody";
import Footer from "./Footer";
import Header from "./Header";

export default function RestaurantDetail() {
	const { slug } = useParams();
	const [restaurant, setRestaurant] = useState(null);
	const [offers, setOffers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRestaurant = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants`
				);
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}

				const data = await res.json();
				const match = data.find((r) => r.restaurantName === slug);

				if (match) {
					setRestaurant(match);
					const offersRes = await fetch(
						`http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants/${match.id}/offers`
					);

					if (!offersRes.ok) {
						throw new Error(`HTTP error! Status: ${offersRes.status}`);
					}

					const offersData = await offersRes.json();
					const today = new Date();

					const activeOffers = offersData.filter((offer) => {
						const expiry = new Date(offer.expiryDate);
						return expiry >= today;
					});

					setOffers(activeOffers);
				}
				setLoading(false);
			} catch (err) {
				console.error("Error fetching restaurant:", err);
				setError(err.message);
				setLoading(false);
			}
		};

		fetchRestaurant();
	}, [slug]);

	return (
		<div className='flex flex-col min-h-screen bg-secondary'>
			<Header />

			<main className='flex-grow'>
				{loading && (
					<div className='text-center py-16'>
						<div className='animate-pulse inline-block h-8 w-8 rounded-full bg-primary opacity-75 mb-4'></div>
						<p className='text-accent-light'>Loading restaurant details...</p>
					</div>
				)}

				{error && (
					<div className='max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-sm text-center'>
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
						<h2 className='text-xl font-semibold text-accent mb-2'>
							Something went wrong
						</h2>
						<p className='text-accent-light mb-6'>
							We couldn't load the restaurant details. Please try again later.
						</p>
						<Link
							to='/'
							className='inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition duration-150'>
							Back to Home
						</Link>
					</div>
				)}

				{!loading && !error && !restaurant && (
					<div className='max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-sm text-center'>
						<svg
							className='h-12 w-12 text-accent-light mx-auto mb-4'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
							/>
						</svg>
						<h2 className='text-xl font-semibold text-accent mb-2'>
							Restaurant not found
						</h2>
						<p className='text-accent-light mb-6'>
							We couldn't find the restaurant you're looking for. It may have
							been removed or you might have followed an incorrect link.
						</p>
						<Link
							to='/'
							className='inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition duration-150'>
							Browse Restaurants
						</Link>
					</div>
				)}

				{!loading && !error && restaurant && (
					<>
						<RestaurantDetailHeader restaurant={restaurant} />

						<div className='container mx-auto px-4 py-6'>
							{offers.length > 0 ? (
								<RestaurantOffersBody offers={offers} />
							) : (
								<div className='p-6 bg-white rounded-lg shadow-sm text-center'>
									<svg
										className='h-12 w-12 text-accent-light mx-auto mb-4'
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
									<h2 className='text-xl font-semibold text-accent mb-2'>
										No active offers
									</h2>
									<p className='text-accent-light mb-4'>
										This restaurant doesn't have any active offers at the
										moment. Please check back later!
									</p>
								</div>
							)}
						</div>
					</>
				)}
			</main>
		</div>
	);
}
