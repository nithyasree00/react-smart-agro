import React, { useState } from "react";
import "./CustomerDashboard.css";
import { FaShoppingCart, FaBox, FaUserCircle, FaHome } from "react-icons/fa";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Dummy Products (later replace with API)
  const products = [
    { id: 1, name: "Tomatoes", price: 40, unit: "kg" },
    { id: 2, name: "Potatoes", price: 30, unit: "kg" },
    { id: 3, name: "Onions", price: 35, unit: "kg" },
    { id: 4, name: "Rice", price: 60, unit: "kg" },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const placeOrder = () => {
    if (!cart.length) return alert("Cart is empty!");
    setOrders([...orders, { id: Date.now(), items: cart, status: "Pending" }]);
    setCart([]);
    alert("✅ Order placed successfully!");
  };

  return (
    <div className="customer-dashboard">
      {/* Navbar */}
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

      {/* Home / Products */}
      {activeTab === "home" && (
        <div className="products-section">
          <h2>Available Products</h2>
          <div className="products-grid">
            {products.map((p) => (
              <div className="product-card" key={p.id}>
                <h3>{p.name}</h3>
                <p>₹{p.price} / {p.unit}</p>
                <button onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart */}
      {activeTab === "cart" && (
        <div className="cart-section">
          <h2>Your Cart</h2>
          {cart.length ? (
            <>
              <ul>
                {cart.map((c, i) => (
                  <li key={i}>{c.name} - ₹{c.price}</li>
                ))}
              </ul>
              <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
            </>
          ) : (
            <p>Cart is empty</p>
          )}
        </div>
      )}

      {/* Orders */}
      {activeTab === "orders" && (
        <div className="orders-section">
          <h2>My Orders</h2>
          {orders.length ? (
            <ul>
              {orders.map((o) => (
                <li key={o.id}>
                  Order #{o.id} - {o.items.length} items - Status: <b>{o.status}</b>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders yet</p>
          )}
        </div>
      )}

      {/* Profile */}
      {activeTab === "profile" && (
        <div className="profile-section">
          <h2>My Profile</h2>
          <p><b>Name:</b> Demo Customer</p>
          <p><b>Mobile:</b> 9876543210</p>
          <p><b>Address:</b> Hyderabad</p>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
