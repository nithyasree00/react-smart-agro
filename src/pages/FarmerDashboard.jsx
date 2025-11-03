import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { PRODUCT_IMAGES } from "../data/products";
import "./FarmerDashboard.css";

const API_BASE = "http://localhost:5000/api";

const FarmerDashboard = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [quality, setQuality] = useState("A");
  const [image, setImage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [postedItems, setPostedItems] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const farmerId = localStorage.getItem("userId");
  const farmerName = localStorage.getItem("name");
  const farmerMobile = localStorage.getItem("mobile");
  const farmerAddress = localStorage.getItem("address");

  const handleItemChange = (e) => {
    const selectedItem = e.target.value;
    setItem(selectedItem);
    setImage(PRODUCT_IMAGES[selectedItem] || "https://via.placeholder.com/150");
  };

  useEffect(() => {
    if (farmerId) {
      fetch(`${API_BASE}/products/farmer/${farmerId}`)
        .then(res => res.json())
        .then(data => setPostedItems(data))
        .catch(err => console.error("Fetch error:", err));
    }
  }, [farmerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item || !quantity || !price || !quality) return alert("Please fill all fields!");

    const productData = { farmerId, item, quantity, price, quality, image };

    try {
      const res = await fetch(`${API_BASE}/products/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        alert("✅ Product added successfully!");
        setItem(""); setQuantity(""); setPrice(""); setQuality("A"); setImage("");
        const data = await res.json();
        setPostedItems(prev => [data.product, ...prev]);
      } else {
        const errData = await res.json();
        alert("Error: " + errData.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error, check console!");
    }
  };

  // Close profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="home">
      <nav>
        <div><img src="https://cdn.vectorstock.com/i/500p/38/97/letter-s-leaf-green-logo-vector-26903897.jpg" alt="Smart Agro Logo" /></div>
        <div className="logo">Smart Agro</div>
        <div>
          <ul>
            <li className="notifications">
              <button onClick={() => setShowNotif(!showNotif)}>
                <FaBell /> Notifications
              </button>
              {showNotif && (
                <ul className="notifications-dropdown">
                  {notifications.length ? notifications.map((n, i) => <li key={i}>{n.message}</li>) : <li></li>}
                </ul>
              )}
            </li>
            <li className="profile" ref={profileRef}>
              <button onClick={() => setShowProfile(!showProfile)}>
                <FaUserCircle /> {farmerName || "Farmer"}
              </button>
              {showProfile && (
                <div className="profile-card">
                  <p><strong>Name:</strong> {farmerName}</p>
                  <p><strong>Mobile:</strong> {farmerMobile}</p>
                  <p><strong>Address:</strong> {farmerAddress}</p>
                  <p><strong>Role:</strong> Farmer</p>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <h2>Post Your Product</h2>
        <form onSubmit={handleSubmit} className="steps">
          <select value={item} onChange={handleItemChange}>
            <option value="">Select Item</option>
            {Object.keys(PRODUCT_IMAGES).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>

          {image && <img src={image} alt={item} className="preview-image" />}

          <input value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity (kg)" />
          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price (₹)" />
          <select value={quality} onChange={e => setQuality(e.target.value)}>
            <option value="A">A (Premium)</option>
            <option value="B">B (Good)</option>
            <option value="C">C (Average)</option>
          </select>

          <button type="submit">Add Product</button>
        </form>

        <h3></h3>
        <ul className="posted-products">
          {postedItems.length
            ? postedItems.map((p, i) => (
                <li key={i}>
                  <img src={p.image} alt={p.item} className="thumb" />
                  <span>{p.item} - ₹{p.price} - {p.quantity}kg ({p.quality})</span>
                </li>
              ))
            : <p></p>}
        </ul>
      </div>
    </div>
  );
};

export default FarmerDashboard;