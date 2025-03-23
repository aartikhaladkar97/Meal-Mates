// src/JoinWaitlistPage.js
import React, { useState } from "react";
import Header from "./Header";

export default function JoinWaitlistPage() {
	const [phone, setPhone] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
		setPhone("");
	};

	return (
		<div className='flex flex-col min-h-screen bg-secondary'>
			<Header />

			<main className='container mx-auto px-4 py-12 flex-grow flex items-center justify-center'>
				<div className='max-w-md w-full bg-white rounded-xl shadow-sm p-8 md:p-10'>
					<div className='text-center mb-8'>
						<h2 className='text-3xl font-bold text-accent mb-4'>
							Find every Indian deal in one place
						</h2>
						<p className='text-accent-light'>
							Enter your contact number to get notified when our mobile app
							launches!
						</p>
					</div>

					{!submitted ? (
						<form
							className='space-y-6'
							onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor='phone'
									className='block text-sm font-medium text-accent mb-2'>
									Contact Number
								</label>
								<div className='relative'>
									<input
										id='phone'
										type='tel'
										placeholder='e.g. +1 123-456-7890'
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										required
										className='w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									/>
									<svg
										className='absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent-light'
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
								</div>
								<p className='mt-2 text-xs text-accent-light'>
									We'll never share your number with anyone else.
								</p>
							</div>

							<button
								type='submit'
								className='w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition duration-150 flex items-center justify-center shadow-sm font-medium'>
								Join Waitlist
								<svg
									className='ml-2 h-5 w-5'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M14 5l7 7m0 0l-7 7m7-7H3'
									/>
								</svg>
							</button>
						</form>
					) : (
						<div className='bg-secondary-light p-6 rounded-lg border-l-4 border-primary text-center'>
							<svg
								className='h-12 w-12 text-primary mx-auto mb-4'
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
							<h3 className='text-lg font-semibold text-accent mb-2'>
								Thank you for joining!
							</h3>
							<p className='text-accent-light'>
								You'll be among the first to know when our app launches.
							</p>
						</div>
					)}

					<div className='mt-8 pt-6 border-t border-secondary'>
						<h3 className='text-lg font-semibold text-accent mb-4'>
							What to expect from our app:
						</h3>
						<ul className='space-y-3'>
							<li className='flex items-start'>
								<svg
									className='h-5 w-5 text-primary mr-3 mt-0.5'
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
								<span className='text-accent-light'>
									Exclusive restaurant deals and offers
								</span>
							</li>
							<li className='flex items-start'>
								<svg
									className='h-5 w-5 text-primary mr-3 mt-0.5'
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
								<span className='text-accent-light'>
									Easy filtering by cuisine type and location
								</span>
							</li>
							<li className='flex items-start'>
								<svg
									className='h-5 w-5 text-primary mr-3 mt-0.5'
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
								<span className='text-accent-light'>
									Real-time notifications for new deals
								</span>
							</li>
						</ul>
					</div>
				</div>
			</main>
		</div>
	);
}
