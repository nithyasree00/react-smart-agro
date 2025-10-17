import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [products, setProducts] = useState([]);
  const [deliveryGuys, setDeliveryGuys] = useState([]);
  const [newGuy, setNewGuy] = useState({ name: "", mobile: "", area: "" });

  useEffect(() => {
    // Fetch farmer requests
    fetch("http://localhost:5000/api/requests")
      .then(res => res.json())
      .then(data => setRequests(data));

    // Fetch customer products
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));

    // Fetch delivery guys
    fetch("http://localhost:5000/api/delivery")
      .then(res => res.json())
      .then(data => setDeliveryGuys(data));
  }, []);

  const handleRequest = async (id, action) => {
    await fetch(`http://localhost:5000/api/requests/${id}/${action}`, { method: "POST" });
    alert(`Request ${action}ed!`);
    window.location.reload();
  };

  const handleRemoveProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    alert("Product removed!");
    window.location.reload();
  };

  const handleAddDeliveryGuy = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/delivery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGuy),
    });
    alert("Delivery Guy Added!");
    setNewGuy({ name: "", mobile: "", area: "" });
    window.location.reload();
  };

  const handleRemoveDeliveryGuy = async (id) => {
    await fetch(`http://localhost:5000/api/delivery/${id}`, { method: "DELETE" });
    alert("Delivery Guy Removed!");
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Admin Dashboard</h1>

      {/* Farmer Requests */}
      <section>
        <h2>Farmer Requests</h2>
        {requests.length ? (
          requests.map((req) => (
            <div key={req._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
              <p><b>Farmer:</b> {req.farmerName}</p>
              <p><b>Item:</b> {req.item} | <b>Qty:</b> {req.quantity} | <b>Price:</b> ₹{req.price}</p>
              <button onClick={() => handleRequest(req._id, "accept")}>Accept</button>
              <button onClick={() => handleRequest(req._id, "reject")}>Reject</button>
            </div>
          ))
        ) : (
          <p>No pending requests</p>
        )}
      </section>

      {/* Customer Products */}
      <section>
        <h2>Customer Products</h2>
        {products.length ? (
          products.map((p) => (
            <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
              <p>{p.item} - {p.quantity}kg @ ₹{p.price}</p>
              <button onClick={() => handleRemoveProduct(p._id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No products</p>
        )}
      </section>

      {/* Delivery Guys */}
      <section>
        <h2>Manage Delivery Guys</h2>
        <form onSubmit={handleAddDeliveryGuy}>
          <input
            placeholder="Name"
            value={newGuy.name}
            onChange={(e) => setNewGuy({ ...newGuy, name: e.target.value })}
          />
          <input
            placeholder="Mobile"
            value={newGuy.mobile}
            onChange={(e) => setNewGuy({ ...newGuy, mobile: e.target.value })}
          />
          <input
            placeholder="Area"
            value={newGuy.area}
            onChange={(e) => setNewGuy({ ...newGuy, area: e.target.value })}
          />
          <button type="submit">Add</button>
        </form>

        {deliveryGuys.length ? (
          deliveryGuys.map((g) => (
            <div key={g._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
              <p>{g.name} | {g.mobile} | {g.area}</p>
              <button onClick={() => handleRemoveDeliveryGuy(g._id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No delivery guys</p>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
