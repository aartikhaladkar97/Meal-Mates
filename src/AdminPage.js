import React, { useEffect, useState } from "react";
import "./index.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig"; // ✅ Make sure this is the correct path

export default function AdminPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("adminLoggedIn") === "true";
  });
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [restaurantOffers, setRestaurantOffers] = useState([]);
  const [showOffers, setShowOffers] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    offerType: "",
    validOn: [],
    expiryDate: "",
  });

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "mealmates123";

  useEffect(() => {
    if (isAuthenticated) {
      fetch("http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants")
        .then(res => res.json())
        .then(data => setRestaurants(data));
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginData.username === ADMIN_USERNAME &&
      loginData.password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsAuthenticated(false);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (restaurant) => {
    setSelectedRestaurant({ ...restaurant });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedRestaurant(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleOfferChange = (e) => {
    const { name, value } = e.target;
    setNewOffer(prev => ({ ...prev, [name]: value }));
  };

  const fetchOffers = async (restaurantId) => {
    try {
      const res = await fetch(
        `http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants/${restaurantId}/offers`
      );
      const data = await res.json();
      setRestaurantOffers(data);
      setShowOffers(true);
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  const addOffer = async () => {
    if (!newOffer.title || !newOffer.description) return alert("Fill all offer fields.");
    const res = await fetch(
      `http://localhost:5001/saltifi-production/us-central1/MealMatesApi/restaurants/${selectedRestaurant.id}/offers`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOffer),
      }
    );
    if (res.ok) {
      alert("Offer added!");
      setNewOffer({ title: "", description: "", offerType: "", validOn: [], expiryDate: "" });
    } else {
      alert("Failed to add offer.");
    }
  };

  const handleSave = async () => {
    let logoUrl = selectedRestaurant.logo;

    if (logoFile) {
      const fileRef = ref(storage, `restaurantLogos/${logoFile.name}`);
      const snapshot = await uploadBytes(fileRef, logoFile);
      logoUrl = await getDownloadURL(snapshot.ref);
    }

    const updatedData = {
      ...selectedRestaurant,
      logo: logoUrl,
    };

    await fetch(
      `http://localhost:5001/saltifi-production/us-central1/MealMatesApi/update-restaurant/${selectedRestaurant.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );

    setRestaurants(prev => prev.map(r => r.id === selectedRestaurant.id ? updatedData : r));
    setSelectedRestaurant(null);
    setLogoFile(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginInputChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>All Restaurants</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <ul className="restaurant-list">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} onClick={() => openModal(restaurant)}>
            {restaurant.restaurantName}
          </li>
        ))}
      </ul>

      {selectedRestaurant && (
        <div className="modal-overlay">
          <div className="modal-content">
            <label>
              <strong>Owner:</strong>
              <input type="text" name="name" value={selectedRestaurant.name} onChange={handleChange} />
            </label>

            <label>
              <strong>Contact:</strong>
              <input type="text" name="contact" value={selectedRestaurant.contact} onChange={handleChange} />
            </label>

            <label>
              <strong>Email:</strong>
              <input type="email" name="email" value={selectedRestaurant.email} onChange={handleChange} />
            </label>

            <label>
              <strong>Address:</strong>
              <textarea name="address" value={selectedRestaurant.address} onChange={handleChange} />
            </label>

            <label>
              <input
                type="checkbox"
                name="verified"
                checked={selectedRestaurant.verified || false}
                onChange={handleChange}
              />
              Verified
            </label>

            <label>
              Upload Logo:
              <input type="file" onChange={(e) => setLogoFile(e.target.files[0])} />
            </label>

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => fetchOffers(selectedRestaurant.id)} style={{ marginLeft: "10px" }}>
                See Offers
              </button>
            </div>

            {showOffers && (
              <div className="offer-list" style={{ marginTop: "20px" }}>
                <h4>Offers</h4>
                {restaurantOffers.length === 0 ? (
                  <p>No offers found.</p>
                ) : (
                  <ul>
                    {restaurantOffers.map((offer, idx) => (
                      <li key={idx} style={{ marginBottom: "10px" }}>
                        <strong>{offer.title}</strong> – {offer.description}
                        <br />
                        <em>Valid On:</em> {Array.isArray(offer.validOn) ? offer.validOn.join(", ") : offer.validOn} | <em>Expires:</em> {offer.expiryDate}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <hr />
            <h4>Add Offer</h4>

            <input name="title" placeholder="Title" value={newOffer.title} onChange={handleOfferChange} />
            <textarea name="description" placeholder="Description" value={newOffer.description} onChange={handleOfferChange} />
            <select name="offerType" value={newOffer.offerType} onChange={handleOfferChange}>
              <option value="">Select Offer Type</option>
              <option value="Combo">Combo</option>
              <option value="Discount Offer">Discount Offer</option>
              <option value="Buffet">Buffet</option>
              <option value="Specials">Specials</option>
            </select>

            <label>Valid On</label>
            <select
              multiple
              name="validOn"
              value={newOffer.validOn}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions, (option) => option.value);
                setNewOffer(prev => ({ ...prev, validOn: options }));
              }}
            >
              <option value="Weekday">Weekday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Friday">Friday</option>
              <option value="Weekends">Weekends</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>

            <label>Expiry Date</label>
            <input type="date" name="expiryDate" value={newOffer.expiryDate} onChange={handleOfferChange} />

            <button onClick={addOffer}>Add Offer</button>
            <button
              onClick={() => {
                setSelectedRestaurant(null);
                setRestaurantOffers([]);
                setShowOffers(false);
              }}
              style={{ marginTop: "10px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
