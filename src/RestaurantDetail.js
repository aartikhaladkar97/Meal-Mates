
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantDetailHeader from "./RestaurantDetailHeader";
import RestaurantOffersBody from "./RestaurantOffersBody";
import Footer from "./Footer";
import "./index.css";

export default function RestaurantDetail() {
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants`);
        const data = await res.json();
        const match = data.find(r => r.restaurantName === slug);

        if (match) {
          setRestaurant(match);
          const offersRes = await fetch(`http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants/${match.id}/offers`);
          const offersData = await offersRes.json();
          const today = new Date();

          const activeOffers = offersData.filter((offer) => {
            const expiry = new Date(offer.expiryDate);
            return expiry >= today;
          });

          setOffers(activeOffers);
        }
      } catch (err) {
        console.error("Error fetching restaurant:", err);
      }
    };

    fetchRestaurant();
  }, [slug]);

  if (!restaurant) {
    return (
      <div className="content">
        <h2>Restaurant not found.</h2>
      </div>
    );
  }

  return (
    <div className="restaurant-page">
      <RestaurantDetailHeader restaurant={restaurant} />
      <RestaurantOffersBody offers={offers} />
    
    </div>
  );
}
