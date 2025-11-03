import React from "react";
import "./Home.css";
import "./CustomerDashboard.jsx";
import { useNavigate } from "react-router-dom";
import { FaSeedling, FaLeaf, FaTruck } from "react-icons/fa";

export default function Home() {
   const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/CustomerDashboard");
  };
  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div><img src="https://cdn.vectorstock.com/i/500p/38/97/letter-s-leaf-green-logo-vector-26903897.jpg" alt="Smart Agro Logo" /></div>
        <div className="logo">Smart Agro</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Signup</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Smart Agro Market</h1>
          <p>
            Freshly harvested vegetables straight from local farms —
            sustainably grown, responsibly delivered.
          </p>
           <button className="explore-btn" onClick={handleExplore}>
          Explore Now
        </button>
        </div>
      </section>

      {/* Steps / Info Section */}
      <section className="steps">
        <h2>How Smart Agro Works</h2>
        <div className="steps-container">
          <div className="step">
            <FaSeedling className="icon" />
            <h3>Smart Farming</h3>
            <p>
              We use advanced technology to monitor crop growth and soil
              health for higher productivity.
            </p>
          </div>
          <div className="step">
            <FaLeaf className="icon" />
            <h3>Fresh Harvest</h3>
            <p>
              Our vegetables are handpicked daily to ensure the best freshness
              and quality for your family.
            </p>
          </div>
          <div className="step">
            <FaTruck className="icon" />
            <h3>Fast Delivery</h3>
            <p>
              Get your order delivered right to your doorstep — quick,
              convenient, and eco-friendly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>🌾 Smart Agro</h3>
          <p>
            Empowering farmers and bringing nature’s goodness to your home.
          </p>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Team</a>
            <a href="#">Contact</a>
          </div>
          <p className="copyright">
            © 2025 Smart Agro | Designed with ❤️ by Team Smart Agro
          </p>
        </div>
      </footer>
    </div>
  );
}