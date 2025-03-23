// src/AboutPage.js
import React from "react";
import Header from "./Header";

export default function AboutPage() {
	return (
		<div className='flex flex-col min-h-screen bg-secondary'>
			<Header />

			<main className='container mx-auto px-4 sm:px-6 py-12 flex-grow'>
				<div className='max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8'>
					<h2 className='text-3xl font-bold text-accent mb-6 text-center'>
						Welcome to MealMates
					</h2>

					<div className='space-y-6 text-accent-light'>
						<p className='leading-relaxed'>
							MealMates is your one-stop platform to discover and enjoy
							exclusive deals from Indian restaurants across New Jersey.
						</p>

						<p className='leading-relaxed'>
							Whether you're craving North Indian curries, South Indian dosas,
							or Maharashtrian street food – MealMates helps you explore,
							compare, and save on the best culinary experiences nearby.
						</p>

						<p className='leading-relaxed'>
							We partner with local restaurants to bring you Buy-One-Get-One
							offers, buffet deals, combo discounts, and more.
						</p>

						<div className='bg-secondary-light p-6 rounded-lg border-l-4 border-primary mt-8'>
							<h3 className='text-lg font-semibold text-accent mb-2'>
								Coming Soon
							</h3>
							<p className='text-accent-light'>
								Our upcoming mobile app will help you find food offers near you,
								track your favorites, and get real-time updates on new deals!
							</p>
							<div className='mt-4'>
								<a
									href='/join-waitlist'
									className='inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition duration-150 shadow-sm'>
									Join the Waitlist
								</a>
							</div>
						</div>
					</div>

					<div className='mt-10 pt-6 border-t border-secondary'>
						<h3 className='text-xl font-semibold text-accent mb-4'>
							Why Choose MealMates?
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='flex items-start'>
								<div className='flex-shrink-0 mt-1'>
									<svg
										className='h-5 w-5 text-primary'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
								</div>
								<div className='ml-3'>
									<h4 className='text-base font-medium text-accent'>
										Exclusive Deals
									</h4>
									<p className='text-sm text-accent-light'>
										Access to special offers you won't find elsewhere
									</p>
								</div>
							</div>

							<div className='flex items-start'>
								<div className='flex-shrink-0 mt-1'>
									<svg
										className='h-5 w-5 text-primary'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
								</div>
								<div className='ml-3'>
									<h4 className='text-base font-medium text-accent'>
										Curated Selection
									</h4>
									<p className='text-sm text-accent-light'>
										Only the best authentic Indian restaurants
									</p>
								</div>
							</div>

							<div className='flex items-start'>
								<div className='flex-shrink-0 mt-1'>
									<svg
										className='h-5 w-5 text-primary'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
								</div>
								<div className='ml-3'>
									<h4 className='text-base font-medium text-accent'>
										Easy Discovery
									</h4>
									<p className='text-sm text-accent-light'>
										Find exactly what you're craving with our filters
									</p>
								</div>
							</div>

							<div className='flex items-start'>
								<div className='flex-shrink-0 mt-1'>
									<svg
										className='h-5 w-5 text-primary'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
								</div>
								<div className='ml-3'>
									<h4 className='text-base font-medium text-accent'>
										Community Focused
									</h4>
									<p className='text-sm text-accent-light'>
										Supporting local Indian restaurants and food lovers
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
