import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { PRODUCT_IMAGES } from "../data/products";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(""); 
  const [notifications, setNotifications] = useState([]);
  const [postedItems, setPostedItems] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);

  const farmerName = localStorage.getItem("name");
  const farmerMobile = localStorage.getItem("mobile");
  const farmerAddress = localStorage.getItem("address");
  const farmerId = localStorage.getItem("userId");

  // Handle product selection
  const handleItemChange = (e) => {
    const selectedItem = e.target.value;
    setItem(selectedItem);
    setImage(PRODUCT_IMAGES[selectedItem] || "https://via.placeholder.com/150"); // fallback image
  };

  // Fetch notifications and history
  useEffect(() => {
    if (!farmerId) return;
    
    fetch(`http://localhost:5000/api/notifications/${farmerId}`)
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error(err));

    fetch(`http://localhost:5000/api/inventory/farmer/${farmerId}`)
      .then(res => res.json())
      .then(data => setPostedItems(data))
      .catch(err => console.error(err));
  }, [farmerId]);

  // Submit request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item || !quantity || !price) return alert("Fill all fields!");

    const requestData = {
      farmerId,
      farmerName,
      farmerMobile,
      farmerAddress,
      item,
      quantity,
      price,
      image: PRODUCT_IMAGES[item] || "https://via.placeholder.com/150",
    };

    try {
      const res = await fetch("http://localhost:5000/api/inventory/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (res.ok) {
        alert("✅ Request sent to Admin");
        setPostedItems(prev => [requestData, ...prev]); // show latest first
        setItem(""); setQuantity(""); setPrice(""); setImage("");
      } else {
        const data = await res.json();
        alert("Error: " + (data.message || "Request failed"));
      }
    } catch (err) {
      console.error(err);
      alert("Request failed, check console");
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
        <div>
          <img src="public/images/LogoSmart.png" alt="Smart Agro Logo" />
        </div>
        <div>
          <ul>
            <li className="notifications">
              <button onClick={() => setShowNotif(!showNotif)}>
                <FaBell /> Notifications
              </button>
              {showNotif && (
                <ul className="notifications-dropdown">
                  {notifications.length
                    ? notifications.map((n, i) => <li key={i}>{n.message}</li>)
                    : <li>No notifications</li>}
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
          {/* Dropdown */}
          <select value={item} onChange={handleItemChange}>
            <option value="">Select Item</option>
            {Object.keys(PRODUCT_IMAGES).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>

          {/* Show image */}
          {image && (
            <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
              <img
                src={image}
                alt={item}
                style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "10px", border: "1px solid #ccc" }}
              />
            </div>
          )}

          <input value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity (kg)" />
          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price (₹)" />
          <button type="submit">Send Request</button>
        </form>

        {/* Request History */}
        <h3>Request History</h3>
        <ul className="posted-products">
          {postedItems.length
            ? postedItems.map((p, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src={p.image || "https://via.placeholder.com/50"} alt={p.item} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
                  <span>{p.item} - {p.quantity} kg - ₹{p.price}</span>
                </li>
              ))
            : <p>No requests sent yet</p>}
        </ul>

        {/* Notifications */}
        <h3>Notifications</h3>
        <ul className="notifications-list">
          {notifications.length
            ? notifications.map((n, i) => <li key={i}>{n.message}</li>)
            : <p>No notifications</p>}
        </ul>
      </div>
    </div>
  );
};

export default FarmerDashboard;
