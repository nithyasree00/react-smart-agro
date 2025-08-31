import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [role, setRole] = useState(""); // which role is active
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    village: "",
    address: "",
    category: "",
    enteredOtp: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

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

  // Step 1: send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    const { mobile } = formData;

    if (!mobileRe.test(mobile)) {
      return setMessage({ type: "error", text: "Mobile must be 10 digits and start with 6/7/8/9." });
    }
    if (!formData.password || formData.password.length < 6) {
      return setMessage({ type: "error", text: "Password must be at least 6 characters." });
    }

    // simulate OTP generation
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
    setMessage({ type: "success", text: `OTP sent to ${mobile} (Simulated: ${generatedOtp})` });
  };

  // Step 2: verify OTP and submit
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (formData.enteredOtp === otp) {
      handleSubmitFinal();
    } else {
      setMessage({ type: "error", text: "Invalid OTP." });
    }
  };

  const handleSubmitFinal = () => {
    const { name, mobile, password, village, address, category } = formData;

    if (!nameRe.test(name)) {
      return setMessage({ type: "error", text: "Name must contain only letters and spaces." });
    }
    if (!mobileRe.test(mobile)) {
      return setMessage({ type: "error", text: "Mobile must be 10 digits and start with 6/7/8/9." });
    }
    if (!password || password.length < 6) {
      return setMessage({ type: "error", text: "Password must be at least 6 characters." });
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
    setFormData({ name: "", mobile: "", password: "", village: "", address: "", category: "", enteredOtp: "" });
    setOtpSent(false);
    setOtp("");
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
        <div>
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="card">
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

              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
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
          ) : (
            <form onSubmit={handleVerifyOtp} className="card">
              <label>Enter OTP</label>
              <input
                type="text"
                name="enteredOtp"
                placeholder="Enter OTP"
                value={formData.enteredOtp}
                onChange={handleChange}
                required
              />
              <button type="submit">Verify OTP</button>
            </form>
          )}

          {message.text && (
            <p className={message.type === "error" ? "error" : "success"}>{message.text}</p>
          )}
        </div>
      )}

      {!role && <p className="note">Select a role above to open its signup form.</p>}
    </div>
  );
};

export default Signup;
