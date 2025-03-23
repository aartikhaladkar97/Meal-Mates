import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function SubmitRestaurant() {
	const [formData, setFormData] = useState({
		name: "",
		contact: "",
		email: "",
		restaurantName: "",
		address: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		setIsSubmitting(true);

		try {
			const response = await fetch(
				"http://localhost:5001/saltifi-production/us-central1/MealMatesApi/submit-restaurant",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				}
			);

			const data = await response.json();
			if (response.ok) {
				setSuccess(true);
				setFormData({
					name: "",
					contact: "",
					email: "",
					restaurantName: "",
					address: "",
				});
			} else {
				setError(data.error || "Failed to submit. Please try again.");
			}
		} catch (err) {
			setError(
				"Something went wrong. Please check your connection and try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='flex flex-col min-h-screen bg-secondary'>
			<Header />

			<main className='container mx-auto px-4 py-8 flex-grow'>
				<div className='max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8'>
					<div className='text-center mb-8'>
						<h1 className='text-3xl font-bold text-accent mb-4'>
							Submit Your Restaurant
						</h1>
						<p className='text-accent-light'>
							Want to list your restaurant on MealMates? Fill out the form below
							and we'll get back to you shortly.
						</p>
					</div>

					{success ? (
						<div className='bg-secondary-light p-6 rounded-lg border-l-4 border-primary text-center mb-6'>
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
								Submission Successful!
							</h3>
							<p className='text-accent-light mb-4'>
								Thank you for submitting your restaurant. Our team will review
								your information and get in touch with you shortly.
							</p>
							<button
								onClick={() => setSuccess(false)}
								className='px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition duration-150'>
								Submit Another Restaurant
							</button>
						</div>
					) : (
						<form
							className='space-y-6'
							onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-medium text-accent mb-1'>
									Name of Owner/Manager
								</label>
								<input
									id='name'
									name='name'
									type='text'
									className='w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									placeholder='Enter your full name'
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>

							<div>
								<label
									htmlFor='contact'
									className='block text-sm font-medium text-accent mb-1'>
									Contact Number
								</label>
								<input
									id='contact'
									name='contact'
									type='tel'
									className='w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									placeholder='e.g. +1 123-456-7890'
									value={formData.contact}
									onChange={handleChange}
									required
								/>
							</div>

							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-accent mb-1'>
									Email
								</label>
								<input
									id='email'
									name='email'
									type='email'
									className='w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									placeholder='your.email@example.com'
									value={formData.email}
									onChange={handleChange}
									required
								/>
							</div>

							<div>
								<label
									htmlFor='restaurantName'
									className='block text-sm font-medium text-accent mb-1'>
									Restaurant Name
								</label>
								<input
									id='restaurantName'
									name='restaurantName'
									type='text'
									className='w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									placeholder='Enter your restaurant name'
									value={formData.restaurantName}
									onChange={handleChange}
									required
								/>
							</div>

							<div>
								<label
									htmlFor='address'
									className='block text-sm font-medium text-accent mb-1'>
									Restaurant Address
								</label>
								<textarea
									id='address'
									name='address'
									rows='3'
									className='w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
									placeholder='Full address including city and ZIP code'
									value={formData.address}
									onChange={handleChange}
									required
								/>
							</div>

							{error && (
								<div className='p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm'>
									<p>{error}</p>
								</div>
							)}

							<div className='flex items-center mt-2'>
								<input
									id='terms'
									name='terms'
									type='checkbox'
									className='h-4 w-4 text-primary border-secondary-dark rounded focus:ring-primary'
									required
								/>
								<label
									htmlFor='terms'
									className='ml-2 block text-sm text-accent-light'>
									I agree to the{" "}
									<a
										href='#'
										className='text-primary hover:underline'>
										Terms and Conditions
									</a>
								</label>
							</div>

							<button
								type='submit'
								disabled={isSubmitting}
								className={`w-full px-6 py-3 bg-primary text-white rounded-lg transition duration-150 flex items-center justify-center shadow-sm ${
									isSubmitting
										? "opacity-70 cursor-not-allowed"
										: "hover:bg-primary-light"
								}`}>
								{isSubmitting ? (
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
										Submitting...
									</>
								) : (
									"Submit Restaurant"
								)}
							</button>
						</form>
					)}

					<div className='mt-8 pt-6 border-t border-secondary text-sm text-accent-light'>
						<h3 className='text-lg font-semibold text-accent mb-4'>
							Why list with MealMates?
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
								<span>Reach more customers looking for Indian cuisine</span>
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
								<span>Promote your special offers and deals</span>
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
								<span>Increase visibility in your local area</span>
							</li>
						</ul>
					</div>
				</div>
			</main>
		</div>
	);
}
