import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook, FaPhoneAlt } from "react-icons/fa";

export default function RestaurantDetailHeader({ restaurant }) {
  const navigate = useNavigate();

  return (
    <div className="restaurant-detail-header">
      <button className="back-btn" onClick={() => navigate("/")}>← Back</button>

      <img
        src={restaurant.logo || "https://via.placeholder.com/100"}
        alt={restaurant.restaurantName}
        className="restaurant-logo"
      />

      <h2 className="restaurant-title">{restaurant.restaurantName}</h2>

      <div className="social-icons">
        {restaurant.instagram && (
          <a href={restaurant.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        )}
        {restaurant.facebook && (
          <a href={restaurant.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
        )}
        {restaurant.contact && (
          <a href={`tel:${restaurant.contact}`}>
            <FaPhoneAlt className="call-mini-btn" />
          </a>
        )}
      </div>

      <p className="restaurant-address">{restaurant.address}</p>
      <p className="restaurant-phone">📞 {restaurant.contact}</p>
    </div>
  );
}
