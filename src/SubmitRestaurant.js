import React, { useState } from "react";
import "./index.css";

export default function SubmitRestaurant() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    restaurantName: "",
    address: "",
  });
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
        setFormData({ name: "", contact: "", email: "", restaurantName: "", address: "" });
      } else {
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="submit-restaurant-page">
      <h2>Submit Your Restaurant</h2>
      <form className="submit-form" onSubmit={handleSubmit}>
        <label>Name of Owner/Manager</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Contact Number</label>
        <input name="contact" value={formData.contact} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Restaurant Name</label>
        <input name="restaurantName" value={formData.restaurantName} onChange={handleChange} required />

        <label>Restaurant Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>

      {success && <p style={{ color: "green", marginTop: "10px" }}>Submitted successfully! 🎉</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}
