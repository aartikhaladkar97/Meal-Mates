// src/JoinWaitlistPage.js
import React, { useState } from "react";
import "./index.css";

export default function JoinWaitlistPage() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setPhone("");
  };

  return (
    <div className="join-waitlist-page">
      <h2>Find every Indian deal in one place</h2>
      <p>Enter your contact number to get notified when our mobile app launches!</p>

      {!submitted ? (
        <form className="waitlist-form" onSubmit={handleSubmit}>
          <label htmlFor="phone">Contact Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="e.g. +1 123-456-7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">Join Waitlist</button>
        </form>
      ) : (
        <p className="confirmation-message">Thank you! You'll be notified when we launch.</p>
      )}
    </div>
  );
}
