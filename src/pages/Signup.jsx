import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [role, setRole] = useState(""); // which role is active
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    village: "",
    address: "",
    category: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  // validation regex
  const nameRe = /^[A-Za-z ]+$/;
  const villageRe = /^[A-Za-z ]+$/;
  const mobileRe = /^[6-9]\d{9}$/;

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "name" || name === "village") {
      value = value.replace(/[^A-Za-z\s]/g, ""); // only letters/spaces
    }
    if (name === "mobile") {
      value = value.replace(/\D/g, "").slice(0, 10); // only 10 digits
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const { name, mobile, village, address, category } = formData;

    if (!nameRe.test(name)) {
      return setMessage({ type: "error", text: "Name must contain only letters and spaces." });
    }
    if (!mobileRe.test(mobile)) {
      return setMessage({ type: "error", text: "Mobile must be 10 digits and start with 6/7/8/9." });
    }
    if (!villageRe.test(village)) {
      return setMessage({ type: "error", text: "Village must contain only letters and spaces." });
    }
    if (!address) {
      return setMessage({ type: "error", text: "Address cannot be empty." });
    }
    if (role === "farmer" && !category) {
      return setMessage({ type: "error", text: "Please select a category." });
    }

    setMessage({ type: "success", text: "Account created successfully (simulated)." });
    setFormData({ name: "", mobile: "", village: "", address: "", category: "" });

    setTimeout(() => setMessage({ type: "", text: "" }), 2500);
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>

      {/* Role buttons */}
      <div className="role-buttons">
        <button className={`btn ${role === "farmer" ? "active" : ""}`} onClick={() => setRole("farmer")}>Farmer</button>
        <button className={`btn ${role === "customer" ? "active" : ""}`} onClick={() => setRole("customer")}>Customer</button>
        <button className={`btn ${role === "delivery" ? "active" : ""}`} onClick={() => setRole("delivery")}>Delivery Person</button>
      </div>

      {/* Form */}
      {role && (
        <div >
          <form onSubmit={handleSubmit} className="card">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Mobile (10 digits)</label>
            <input
              type="tel"
              name="mobile"
              placeholder="e.g. 98xxxxxxxx"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

            <label>Village</label>
            <input
              type="text"
              name="village"
              placeholder="Village"
              value={formData.village}
              onChange={handleChange}
              required
            />

            <label>Address</label>
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            {role === "farmer" && (
              <>
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Category --</option>
                  <option value="Farming">Farming</option>
                  <option value="Milk supply">Milk supply</option>
                  <option value="Farming+Milk supply">Farming + Milk supply</option>
                </select>
              </>
            )}

            {message.text && (
              <p className={message.type === "error" ? "error" : "success"}>{message.text}</p>
            )}

            <button type="submit">
              {role === "farmer"
                ? "Create Farmer Account"
                : role === "customer"
                ? "Create Customer Account"
                : "Create Delivery Account"}
            </button>
          </form>
        </div>
      )}

      {!role && <p className="note">Select a role above to open its signup form.</p>}
    </div>
  );
};

export default Signup;
