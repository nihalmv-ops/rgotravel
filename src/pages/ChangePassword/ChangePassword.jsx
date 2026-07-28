import "./ChangePassword.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaLock, FaEye, FaEyeSlash, FaSave } from "react-icons/fa";

function ChangePassword() {

  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {

      alert("Please fill in all fields.");

      return;

    }

    if (form.newPassword !== form.confirmPassword) {

      alert("New passwords do not match.");

      return;

    }

    if (form.newPassword.length < 6) {

      alert("New password must be at least 6 characters.");

      return;

    }

    // This is a frontend demo — hook this up to your auth backend later
    alert("Password updated successfully!");

    navigate("/profile");

  };

  return (

    <section className="cp-page">

      <div className="cp-card">

        <h1>Change Password</h1>

        <p>Keep your account secure with a strong password.</p>

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <FaLock />

            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
            />

            <span onClick={() => setShowCurrent(!showCurrent)}>
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          <div className="input-box">

            <FaLock />

            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
            />

            <span onClick={() => setShowNew(!showNew)}>
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          <div className="input-box">

            <FaLock />

            <input
              type={showNew ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

          </div>

          <button type="submit">
            <FaSave />
            Update Password
          </button>

        </form>

      </div>

    </section>

  );

}

export default ChangePassword;