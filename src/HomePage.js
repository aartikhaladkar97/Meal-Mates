import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Header from "./Header";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
 


  const navigate = useNavigate();
  const filterRef = useRef(null);

  const handleCheckboxChange = (value, setState, state) => {
    setState(
      state.includes(value)
        ? state.filter((item) => item !== value)
        : [...state, value]
    );
  };
  useEffect(() => {
    fetch("http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants")
      .then(res => res.json())
      .then(data => {
        const verifiedOnly = data.filter(r => r.verified); // ✅ only verified
        setRestaurants(verifiedOnly);
      });
  }, []);
  

  const filteredRestaurants = restaurants.filter((restaurant) => {
    console.log(restaurant)
    const matchesSearch =
      restaurant.restaurantName.toLowerCase().includes(searchText.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchText.toLowerCase());
  
    const matchesSpeciality =
      selectedSpecialities.length === 0 ||
      selectedSpecialities.includes(restaurant.speciality);
  
    const matchesOffer =
      selectedOffers.length === 0 ||
      restaurant.offers?.some((offer) => selectedOffers.includes(offer.type));
  
    const matchesCity =
      selectedCities.length === 0 || selectedCities.includes(restaurant.city);
  
    return matchesSearch && matchesSpeciality && matchesOffer && matchesCity;
  });
  
  return (
    <div className="App">
      <Header />

      <div className="content">
        <div className="search-filter-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            Filters
          </button>
        </div>

        {isFilterOpen && (
          <div className="filter-container" ref={filterRef}>
            <div className="filter-section">
              <h4>Speciality</h4>
              {["Indian", "North Indian", "South Indian", "Maharashtrian"].map((type) => (
                <label key={type} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedSpecialities.includes(type)}
                    onChange={() =>
                      handleCheckboxChange(type, setSelectedSpecialities, selectedSpecialities)
                    }
                  />
                  {type}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h4>Offer Type</h4>
              {["Combos", "Buy 1 Get 1", "Buffet"].map((offer) => (
                <label key={offer} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedOffers.includes(offer)}
                    onChange={() => handleCheckboxChange(offer, setSelectedOffers, selectedOffers)}
                  />
                  {offer}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h4>City</h4>
              {["Mumbai", "Pune", "Bangalore", "Delhi"].map((city) => (
                <label key={city} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCities.includes(city)}
                    onChange={() => handleCheckboxChange(city, setSelectedCities, selectedCities)}
                  />
                  {city}
                </label>
              ))}
            </div>

            <div className="filter-buttons">
              <button className="apply-button" onClick={() => setIsFilterOpen(false)}>Apply</button>
              <button className="clear-button" onClick={clearFilters}>Clear</button>
            </div>
          </div>
        )}

        <div className="offers-container">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div
                className="restaurant-tile"
                key={restaurant.restaurantName}
                onClick={() => navigate(`/${restaurant.restaurantName}`)}
              >
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.restaurantName}</h3>
                  <p className="restaurant-location">{restaurant.address}</p>
                </div>

                <div className="restaurant-logo-container">
                  <img
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="restaurant-logo"
                  />
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No restaurants found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
