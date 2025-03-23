import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook, FaPhoneAlt } from "react-icons/fa";

export default function RestaurantDetailHeader({ restaurant }) {
	const navigate = useNavigate();

	return (
		<div className='bg-white border-b border-secondary'>
			<div className='container mx-auto px-4 py-6'>
				{/* Improved Back button */}
				<button
					className='mb-6 inline-flex items-center px-3 py-2 bg-secondary hover:bg-secondary-dark text-accent rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'
					onClick={() => navigate("/")}>
					<svg
						className='w-5 h-5 mr-2'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M10 19l-7-7m0 0l7-7m-7 7h18'
						/>
					</svg>
					Back to restaurants
				</button>

				<div className='md:flex md:items-center md:justify-between'>
					{/* Restaurant info */}
					<div className='flex items-center'>
						<div className='flex-shrink-0 h-20 w-20 md:h-24 md:w-24 bg-secondary-light rounded-lg overflow-hidden'>
							<img
								src={restaurant.logo || "https://via.placeholder.com/100"}
								alt={restaurant.restaurantName}
								className='h-full w-full object-cover'
								onError={(e) => {
									e.target.style.display = "none";
									e.target.parentNode.appendChild(
										document
											.createRange()
											.createContextualFragment(
												`<div class="h-full w-full flex items-center justify-center bg-primary text-white text-2xl font-bold">${restaurant.restaurantName
													.charAt(0)
													.toUpperCase()}</div>`
											)
									);
								}}
							/>
						</div>
						<div className='ml-5'>
							<h1 className='text-2xl font-bold text-accent mb-1'>
								{restaurant.restaurantName}
							</h1>

							<div className='flex flex-wrap items-center text-sm text-accent-light mb-2'>
								{restaurant.speciality && (
									<span className='inline-block px-2 py-1 bg-secondary rounded-md text-xs font-medium text-accent-light mr-2 mb-1'>
										{restaurant.speciality}
									</span>
								)}
								{restaurant.city && (
									<span className='mr-2 mb-1 flex items-center'>
										<svg
											className='w-4 h-4 mr-1'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
										{restaurant.city}
									</span>
								)}
							</div>

							<address className='not-italic text-sm text-accent-light mb-2 flex items-start'>
								<svg
									className='w-4 h-4 mr-1 mt-0.5 flex-shrink-0'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
									/>
								</svg>
								<span>{restaurant.address}</span>
							</address>

							{restaurant.contact && (
								<div className='text-sm text-accent-light flex items-center'>
									<svg
										className='w-4 h-4 mr-1'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
										/>
									</svg>
									<a
										href={`tel:${restaurant.contact}`}
										className='hover:text-primary transition-colors'>
										{restaurant.contact}
									</a>
								</div>
							)}
						</div>
					</div>

					{/* Social icons and actions */}
					<div className='mt-6 md:mt-0 flex items-center'>
						<div className='flex space-x-3 mr-4'>
							{restaurant.instagram && (
								<a
									href={restaurant.instagram}
									target='_blank'
									rel='noopener noreferrer'
									className='w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary-dark text-accent-light hover:text-primary transition-colors'>
									<FaInstagram className='w-5 h-5' />
								</a>
							)}
							{restaurant.facebook && (
								<a
									href={restaurant.facebook}
									target='_blank'
									rel='noopener noreferrer'
									className='w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary-dark text-accent-light hover:text-primary transition-colors'>
									<FaFacebook className='w-5 h-5' />
								</a>
							)}
						</div>

						{restaurant.contact && (
							<a
								href={`tel:${restaurant.contact}`}
								className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition duration-150 flex items-center justify-center shadow-sm'>
								<FaPhoneAlt className='mr-2' />
								Call Now
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
