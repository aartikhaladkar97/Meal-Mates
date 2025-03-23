import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import mealmatesLogo from "./assets/MealMates.png";

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setMenuOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className='bg-white shadow-lg px-4 py-4 sticky top-0 z-50 border-b border-secondary'>
			<div className='container mx-auto flex items-center justify-between'>
				{/* Logo Section */}
				<div className='flex items-center'>
					<Link
						to='/'
						className='flex items-center'>
						<img
							src={mealmatesLogo}
							alt='MealMates Logo'
							className='h-20 w-auto object-cover'
							style={{
								maxWidth: "300px",
								imageRendering: "crisp-edges",
							}}
						/>
					</Link>
				</div>

				{/* Title - Hidden on mobile, visible on larger screens */}
				<div className='hidden md:block'>
					<h1 className='text-accent text-xl font-semibold tracking-tight'>
						Nearby Indian Restaurants
					</h1>
				</div>

				{/* Menu Button & Dropdown */}
				<div
					className='relative'
					ref={menuRef}>
					<button
						className='flex items-center justify-center text-primary p-2 rounded-md border border-transparent hover:border-primary-light hover:bg-secondary hover:text-primary-light transition-all duration-150'
						onClick={() => setMenuOpen(!menuOpen)}
						aria-expanded={menuOpen}
						aria-label='Main menu'>
						<svg
							className='w-6 h-6'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								d={
									menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
								}></path>
						</svg>
					</button>

					{/* Dropdown Menu with Animation */}
					{menuOpen && (
						<div
							className='absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl py-2 z-50 overflow-hidden border border-secondary'
							style={{
								animation: "fadeInDown 0.2s ease-out forwards",
								transformOrigin: "top right",
							}}>
							<div className='px-4 py-3 text-sm text-accent-light font-medium uppercase tracking-wider border-b border-secondary'>
								Menu
							</div>
							<div className='py-1'>
								<Link
									to='/join-waitlist'
									className='block px-4 py-3 text-accent hover:bg-secondary hover:text-primary-light transition duration-150 flex items-center'
									onClick={() => setMenuOpen(false)}>
									<svg
										className='w-5 h-5 mr-3 text-primary'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
									</svg>
									Join Mobile App Waitlist
								</Link>
								<Link
									to='/submit-restaurant'
									className='block px-4 py-3 text-accent hover:bg-secondary hover:text-primary-light transition duration-150 flex items-center'
									onClick={() => setMenuOpen(false)}>
									<svg
										className='w-5 h-5 mr-3 text-primary'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'></path>
									</svg>
									Submit a Restaurant
								</Link>
								<Link
									to='/about'
									className='block px-4 py-3 text-accent hover:bg-secondary hover:text-primary-light transition duration-150 flex items-center'
									onClick={() => setMenuOpen(false)}>
									<svg
										className='w-5 h-5 mr-3 text-primary'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
									</svg>
									About MealMates
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
