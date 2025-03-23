import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import mealmatesLogo from "./assets/MealMates.png";
import "./index.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for detecting outside clicks

  // Function to close menu if clicked outside
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
    <header className="navbar">
      {/* Left: Logo */}
      <div className="brand-logo-section">
        <img src={mealmatesLogo} alt="MealMates Logo" className="header-logo" />
      </div>

      {/* Center: Title */}
      <div className="header-title-section">
        <h1 className="hero-title">Nearby Indian Restaurants</h1>
      </div>

      {/* Right: Hamburger Menu */}
      <div className="menu-container" ref={menuRef}>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <nav className="menu-nav">
            <ul>
            <Link className="menu-item" to="/join-waitlist">Join Mobile App Waitlist</Link>
              <Link className="menu-item" to="/submit-restaurant">Submit a Restaurant</Link>
              <Link className="menu-item" to="/about">Find out more about MealMates</Link>

        
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
