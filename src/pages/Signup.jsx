import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const [role, setRole] = useState(""); 
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    village: "",
    address: "",
    category: "",
    password: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  // validation regex
  const nameRe = /^[A-Za-z ]+$/;
  const villageRe = /^[A-Za-z ]+$/;
  const mobileRe = /^[6-9]\d{9}$/;

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "name" || name === "village") {
      value = value.replace(/[^A-Za-z\s]/g, ""); 
    }
    if (name === "mobile") {
      value = value.replace(/\D/g, "").slice(0, 10); 
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const { name, mobile, village, address, category, password } = formData;

    // Validations
    if (!role) return setMessage({ type: "error", text: "Please select a role." });
    if (!nameRe.test(name)) return setMessage({ type: "error", text: "Name must contain only letters and spaces." });
    if (!mobileRe.test(mobile)) return setMessage({ type: "error", text: "Mobile must be 10 digits and start with 6/7/8/9." });
    if (!villageRe.test(village)) return setMessage({ type: "error", text: "Village must contain only letters and spaces." });
    if (!address) return setMessage({ type: "error", text: "Address cannot be empty." });
    if (role === "farmer" && !category) return setMessage({ type: "error", text: "Please select a category." });
    if (!password || password.length < 6) return setMessage({ type: "error", text: "Password must be at least 6 characters." });

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setFormData({ name: "", mobile: "", village: "", address: "", category: "", password: "" });
        setRole(""); 
        navigate("/Login"); // reset role selection
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setMessage({ type: "error", text: "Server error. Try again later." });
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>

      <div className="role-buttons">
        <button className={`btn ${role === "farmer" ? "active" : ""}`} onClick={() => setRole("farmer")}>Farmer</button>
        <button className={`btn ${role === "customer" ? "active" : ""}`} onClick={() => setRole("customer")}>Customer</button>
        <button className={`btn ${role === "delivery" ? "active" : ""}`} onClick={() => setRole("delivery")}>Delivery Person</button>
      </div>

      {role && (
        <form onSubmit={handleSubmit} className="card">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Mobile</label>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

          <label>Village</label>
          <input type="text" name="village" value={formData.village} onChange={handleChange} required />

          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required />

          {role === "farmer" && (
            <>
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">-- Select Category --</option>
                <option value="Farming">Farming</option>
                <option value="Milk supply">Milk supply</option>
                <option value="Farming+Milk supply">Farming + Milk supply</option>
              </select>
            </>
          )}

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Min 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {message.text && <p className={message.type === "error" ? "error" : "success"}>{message.text}</p>}

          <button type="submit">
            {role === "farmer" ? "Create Farmer Account" : role === "customer" ? "Create Customer Account" : "Create Delivery Account"}
          </button>
        </form>
      )}

      {!role && <p className="note">Select a role above to open its signup form.</p>}
    </div>
  );
};

export default Signup;
