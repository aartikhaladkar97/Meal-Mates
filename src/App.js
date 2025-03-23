import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Footer from "./Footer";
import HomePage from "./HomePage";
import RestaurantDetail from "./RestaurantDetail";
import OfferDetailPage from "./OfferDetailPage";
import SubmitRestaurant from "./SubmitRestaurant";
import JoinWaitlistPage from "./JoinWaitlistPage"; // ✅ Import the component
import restaurants from "./restaurants";
import AboutPage from "./AboutPage";
import AdminPage from "./AdminPage"; // ✅ import the AdminPage


function App() {
  const [selectedRestaurants, setSelectedRestaurants] = useState(restaurants);
  const location = useLocation();

  const hideHeaderOnOfferPage = location.pathname.includes("/offers/");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offers/:slug/:offerIndex" element={<OfferDetailPage />} />
        <Route path="/submit-restaurant" element={<SubmitRestaurant />} />
        <Route path="/join-waitlist" element={<JoinWaitlistPage />} /> {/* ✅ New Route */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage />} /> {/* ✅ Admin Page Route */}
        <Route path="/:slug" element={<RestaurantDetail />} />


      </Routes>

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
