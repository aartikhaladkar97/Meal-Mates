import React from "react";

export default function RestaurantOffersBody({ offers }) {
	// Format date to be more readable
	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div className='py-6'>
			<h2 className='text-2xl font-bold text-accent mb-6'>Special Offers</h2>

			{offers.length === 0 ? (
				<div className='bg-white rounded-lg shadow-sm p-8 text-center'>
					<svg
						className='h-12 w-12 text-accent-light mx-auto mb-4'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					<p className='text-accent-light'>No active offers at the moment.</p>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{offers.map((offer, index) => (
						<div
							key={index}
							className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200'>
							{/* Offer header with type */}
							<div className='p-4 bg-primary text-white flex justify-between items-center'>
								<span className='font-semibold'>{offer.offerType}</span>
								<span className='text-xs bg-white bg-opacity-20 px-2 py-1 rounded'>
									Expires: {formatDate(offer.expiryDate)}
								</span>
							</div>

							{/* Offer content */}
							<div className='p-5'>
								<h3 className='text-lg font-semibold text-accent mb-2'>
									{offer.title}
								</h3>
								<p className='text-accent-light text-sm mb-4'>
									{offer.description}
								</p>

								<div className='space-y-3 text-sm'>
									{offer.validOn && (
										<div className='flex items-start'>
											<svg
												className='w-4 h-4 text-primary mr-2 mt-0.5'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
												/>
											</svg>
											<div>
												<span className='text-accent font-medium block mb-1'>
													Valid On
												</span>
												<span className='text-accent-light'>
													{Array.isArray(offer.validOn)
														? offer.validOn.join(", ")
														: offer.validOn}
												</span>
											</div>
										</div>
									)}

									{offer.conditions && (
										<div className='flex items-start'>
											<svg
												className='w-4 h-4 text-primary mr-2 mt-0.5'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
												/>
											</svg>
											<div>
												<span className='text-accent font-medium block mb-1'>
													Conditions
												</span>
												<span className='text-accent-light'>
													{offer.conditions}
												</span>
											</div>
										</div>
									)}
								</div>

								{/* Claim button */}
								<div className='mt-5 pt-4 border-t border-secondary flex items-center justify-between'>
									<span className='text-accent-light text-xs'>
										Show this offer at the restaurant
									</span>
									<button className='px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-light transition duration-150'>
										View Details
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
