import React, { useState } from "react";
import "./Login.css";

const App = () => {
  const [selectedForm, setSelectedForm] = useState(""); // which form is visible
  const [formData, setFormData] = useState({}); // store inputs

  // generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // simple validation
  const validate = (type) => {
    if (type === "admin") {
      if (!/^[A-Za-z\s]+$/.test(formData.username || "")) {
        alert("Username should contain only letters.");
        return false;
      }
      if (!formData.password) {
        alert("Password cannot be empty.");
        return false;
      }
      return true;
    } else {
      if (!/^[A-Za-z\s]+$/.test(formData.name || "")) {
        alert("Name should contain only letters.");
        return false;
      }
      if (!/^[6-9]\d{9}$/.test(formData.mobile || "")) {
        alert("Mobile must be 10 digits starting with 6–9.");
        return false;
      }
      return true;
    }
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (validate(type)) {
      alert(`${type} login successful!`);
      setFormData({}); // reset
    }
  };

  return (
    <div className="app">
      <h1>Login</h1>

      {/* Options */}
      <div className="container">
        <div className="box" onClick={() => setSelectedForm("admin")}>Admin</div>
        <div className="box" onClick={() => setSelectedForm("farmer")}>Farmer</div>
        <div className="box" onClick={() => setSelectedForm("customer")}>Customer</div>
        <div className="box" onClick={() => setSelectedForm("delivery")}>Delivery</div>
      </div>

      {/* Admin Form */}
      {selectedForm === "admin" && (
        <form onSubmit={(e) => handleSubmit(e, "admin")}>
          <h2>Admin Login</h2>
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            placeholder="Enter Username"
          />
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            placeholder="Enter Password"
          />
          <button type="submit">Login</button>
        </form>
      )}

      {/* Other Users Form */}
      {["farmer", "customer", "delivery"].includes(selectedForm) && (
        <form onSubmit={(e) => handleSubmit(e, selectedForm)}>
          <h2>{selectedForm} Login</h2>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Enter Name"
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile || ""}
            onChange={handleChange}
            placeholder="Enter Mobile"
          />
          <button type="submit">Login as {selectedForm}</button>
        </form>
      )}
    </div>
  );
};

export default App;
