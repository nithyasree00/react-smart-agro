import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaPlus, FaTruck, FaBox, FaBell } from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [customerProducts, setCustomerProducts] = useState([]);
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [activeSection, setActiveSection] = useState("pending");
  const [loading, setLoading] = useState(true);

  // Fetch pending requests from backend
  const handleAccept = async (req) => {
  try {
    const res = await fetch(`http://localhost:5000/api/inventory/accept/${req._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        farmerId: req.farmerId,
        farmerName: req.farmer,
        item: req.item,
        quantity: req.quantity,
        price: req.price
      }),
    });
    if (res.ok) {
      setPendingRequests(pendingRequests.filter(r => r._id !== req._id));
      alert("✅ Request accepted successfully!");
    }
  } catch (err) {
    console.error(err);
  }
};

const handleReject = async (req) => {
  try {
    const res = await fetch(`http://localhost:5000/api/inventory/reject/${req._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        farmerId: req.farmerId,
        farmerName: req.farmer,
        item: req.item,
      }),
    });
    if (res.ok) {
      setPendingRequests(pendingRequests.filter(r => r._id !== req._id));
      alert("❌ Request rejected.");
    }
  } catch (err) {
    console.error(err);
  }
};
  const handleRemoveProduct = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/inventory/remove/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setCustomerProducts(customerProducts.filter(p => p._id !== id));
      alert("✅ Product removed successfully!");
    }
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li
            className={activeSection === "pending" ? "active" : ""}
            onClick={() => setActiveSection("pending")}
          >
            <FaBox /> Pending Requests
          </li>
          <li
            className={activeSection === "products" ? "active" : ""}
            onClick={() => setActiveSection("products")}
          >
            <FaPlus /> Customer Products
          </li>
          <li
            className={activeSection === "delivery" ? "active" : ""}
            onClick={() => setActiveSection("delivery")}
          >
            <FaTruck /> Delivery Orders
          </li>
          <li>
            <FaBell /> Notifications
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Pending Requests Section */}
        {activeSection === "pending" && (
          <div className="section pending-requests">
            <h2>Pending Requests</h2>
            {loading ? (
              <p>Loading...</p>
            ) : pendingRequests.length ? (
              <table>
                <thead>
                  <tr>
                    <th>Farmer</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.farmer}</td>
                      <td>{req.item}</td>
                      <td>{req.quantity}</td>
                      <td>{req.price}</td>
                      <td>
                        <button className="accept" onClick={() => handleAccept(req._id)}>
                          <FaCheck />
                        </button>
                        <button className="reject" onClick={() => handleReject(req._id)}>
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No pending requests.</p>
            )}
          </div>
        )}

        {/* Customer Products Section */}
        {activeSection === "products" && (
          <div className="section customer-products">
            <h2>Customer Products</h2>
            {customerProducts.length ? (
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Farmer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customerProducts.map((prod) => (
                    <tr key={prod._id}>
                      <td>{prod.product}</td>
                      <td>{prod.quantity}</td>
                      <td>{prod.price}</td>
                      <td>{prod.farmer}</td>
                      <td>
                        <button className="remove" onClick={() => handleRemoveProduct(prod._id)}>
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No products available.</p>
            )}
          </div>
        )}

        {/* Delivery Orders Section */}
        {activeSection === "delivery" && (
          <div className="section delivery-orders">
            <h2>Delivery Orders</h2>
            {deliveryOrders.length ? (
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.orderId}</td>
                      <td>{order.customer}</td>
                      <td>{order.address}</td>
                      <td>{order.status}</td>
                      <td>
                        {order.status !== "Delivered" && (
                          <button className="delivered" onClick={() => handleMarkDelivered(order._id)}>
                            Mark Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No delivery orders.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
