import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const roles = ["admin", "farmer", "customer", "delivery"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { mobile, password, role } = formData;
    if (!mobile || !password || !role) {
      return alert("Please fill all fields and select a role");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password, role }), // ✅ corrected here
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redirect to respective dashboard
        if (data.role === "customer") navigate("/CustomerDashboard");
        if (data.role === "farmer") navigate("/FarmerDashboard");
        if (data.role === "admin") navigate("/AdminDashboard");
        if (data.role === "delivery") navigate("/DeliveryDashboard");
      } else {
        alert(data.message || "Invalid mobile or password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter your mobile number"
          maxLength="10"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">-- Select Role --</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
