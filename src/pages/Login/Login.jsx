import "./Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Login user
    login();

    // Redirect to home page
    navigate("/");
  };

  return (
    <section className="login-page">
      <div className="login-box">
        <h1>Welcome Back</h1>

        <p>Login to continue your journey with GoTravel</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-box">
            <FaEnvelope />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">
            Login
          </button>
        </form>

        <div className="login-bottom">
          <p>Don't have an account?</p>

          <Link to="/register">
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;