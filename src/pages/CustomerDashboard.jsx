import React, { useState, useEffect } from "react";
import "./CustomerDashboard.css";
import { FaShoppingCart, FaBox, FaUserCircle, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  // Fetch products
  useEffect(() => {
    axios.get(`${API_BASE}/products`).then((res) => setProducts(res.data));
  }, []);

  // Fetch profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token)
      axios
        .get(`${API_BASE}/customers/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token"));
  }, [isLoggedIn]);

  // Fetch orders
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token)
      axios
        .get(`${API_BASE}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data));
  }, [isLoggedIn]);

  const addToCart = (p) => {
    if (!isLoggedIn) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    setCart([...cart, p]);
  };

  const placeOrder = async () => {
    if (!cart.length) return alert("Cart is empty!");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE}/orders`,
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Order placed successfully!");
      setCart([]);
    } catch (err) {
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className="customer-dashboard">
      <nav className="customer-nav">
        <div className="logo">Smart Agro</div>
        <ul>
          <li onClick={() => setActiveTab("home")} className={activeTab === "home" ? "active" : ""}>
            <FaHome /> Home
          </li>
          <li onClick={() => setActiveTab("cart")} className={activeTab === "cart" ? "active" : ""}>
            <FaShoppingCart /> Cart ({cart.length})
          </li>
          <li onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "active" : ""}>
            <FaBox /> My Orders
          </li>
          <li onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "active" : ""}>
            <FaUserCircle /> Profile
          </li>
        </ul>
      </nav>

      {activeTab === "home" && (
        <div className="products-section">
          <h2>Available Fresh Products</h2>
          <div className="products-grid">
            {products.map((p) => (
              <div className="product-card" key={p._id}>
                <h3>{p.name}</h3>
                <p>₹{p.price} / {p.unit}</p>
                <button onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "cart" && (
        <div className="cart-section">
          <h2>Your Cart</h2>
          {cart.length ? (
            <>
              <ul>{cart.map((c, i) => <li key={i}>{c.name} - ₹{c.price}</li>)}</ul>
              <button onClick={placeOrder}>Place Order</button>
            </>
          ) : (
            <p>Cart is empty</p>
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div className="orders-section">
          <h2>My Orders</h2>
          {orders.length ? (
            <ul>{orders.map((o) => <li key={o._id}>Order #{o._id.slice(-5)} - {o.items.length} items - {o.status}</li>)}</ul>
          ) : (
            <p>No orders yet</p>
          )}
        </div>
      )}

      {activeTab === "profile" && (
        <div className="profile-section">
          <h2>My Profile</h2>
          {user ? (
            <>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Mobile:</b> {user.mobile}</p>
              <p><b>Address:</b> {user.address}</p>
              <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }}>Logout</button>
            </>
          ) : (
            <button onClick={() => navigate("/login")}>Login / Signup</button>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
