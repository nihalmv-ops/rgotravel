import "./EditProfile.css";

import { useState } from "react";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function EditProfile() {

  const navigate = useNavigate();

  const [name, setName] = useState("Nihal MV");

  const [email, setEmail] = useState("nihal@example.com");

  const [phone, setPhone] = useState("+91 9876543210");

  const [location, setLocation] = useState("Kerala, India");

  const handleSubmit = (e) => {

    e.preventDefault();

    // Save profile changes here (API call / context update)

    navigate("/profile");

  };

  return (

    <section className="edit-profile">

      <div className="edit-card">

        <h1>
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <FaUser />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

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

            <FaPhone />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

          </div>

          <div className="input-box">

            <FaMapMarkerAlt />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

          </div>

          <button type="submit">

            <FaSave />
            Save Changes

          </button>

        </form>

      </div>

    </section>

  );

}

export default EditProfile;