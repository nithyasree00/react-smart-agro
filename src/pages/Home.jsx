import React from "react";
import { FaUserPlus, FaSearch, FaShoppingCart, FaBox, FaTruck } from "react-icons/fa";
import "./Home.css"; // external css file (see below)

export default function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <nav>
        <div>
          <img src="public/images/LogoSmart.png" alt="Smart Agro Logo" />
        </div>
        <div>
          <ul>
            <li><a href="/Login" className="btn">Login</a></li>
            <li><a href="/Signup" className="btn">Signup</a></li>
          </ul>
        </div>
      </nav>

      {/* Main container */}
      <div className="container">
        <h1>Welcome to Smart Agro Market</h1>

        {/* Steps section */}
        <section className="steps">
          <div className="step">
            <FaUserPlus />
            <h3>Signup / Login</h3>
            <p>Create your account and login with credentials.</p>
          </div>

          <div className="step">
            <FaSearch />
            <h3>Browse Products</h3>
            <p>Explore fresh farm produce directly from farmers.</p>
          </div>

          <div className="step">
            <FaShoppingCart />
            <h3>Add to Cart</h3>
            <p>Select products you want and add them to your cart.</p>
          </div>

          <div className="step">
            <FaBox />
            <h3>Place Order</h3>
            <p>Confirm your order and choose delivery options.</p>
          </div>

          <div className="step">
            <FaTruck />
            <h3>Delivery</h3>
            <p>Get fresh products delivered to your doorstep.</p>
          </div>
        </section>
      </div>
    </div>
  );
}