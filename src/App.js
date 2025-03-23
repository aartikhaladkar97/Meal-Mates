import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import "./index.css";
import Footer from "./Footer";
import HomePage from "./HomePage";
import RestaurantDetail from "./RestaurantDetail";
import SubmitRestaurant from "./SubmitRestaurant";
import JoinWaitlistPage from "./JoinWaitlistPage";
import restaurants from "./restaurants";
import AboutPage from "./AboutPage";
import AdminPage from "./AdminPage";

function App() {
	const [selectedRestaurants, setSelectedRestaurants] = useState(restaurants);
	const location = useLocation();

	const hideHeaderOnOfferPage = location.pathname.includes("/offers/");

	return (
		<div className='flex flex-col min-h-screen bg-secondary'>
			<main className='flex-grow'>
				<Routes>
					<Route
						path='/'
						element={<HomePage />}
					/>
					<Route
						path='/submit-restaurant'
						element={<SubmitRestaurant />}
					/>
					<Route
						path='/join-waitlist'
						element={<JoinWaitlistPage />}
					/>
					<Route
						path='/about'
						element={<AboutPage />}
					/>
					<Route
						path='/admin'
						element={<AdminPage />}
					/>
					<Route
						path='/:slug'
						element={<RestaurantDetail />}
					/>
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

// Wrapping in Router
export default function AppWrapper() {
	return (
		<Router>
			<App />
		</Router>
	);
}
