import "./EditProfile.css";

import { useState, useRef } from "react";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaCamera,
  FaUserCircle
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function EditProfile() {

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [name, setName] = useState("Nihal MV");

  const [email, setEmail] = useState("nihal@example.com");

  const [phone, setPhone] = useState("+91 9876543210");

  const [location, setLocation] = useState("Kerala, India");

  const [photo, setPhoto] = useState(
    () => localStorage.getItem("profilePicture") || ""
  );

  const handlePhotoClick = () => {

    fileInputRef.current.click();

  };

  const handlePhotoChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      alert("Please select an image file.");

      return;

    }

    if (file.size > 3 * 1024 * 1024) {

      alert("Please choose an image smaller than 3MB.");

      return;

    }

    const reader = new FileReader();

    reader.onloadend = () => {

      setPhoto(reader.result);

    };

    reader.readAsDataURL(file);

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    // Save profile changes here (API call / context update)

    if (photo) {

      localStorage.setItem("profilePicture", photo);

    } else {

      localStorage.removeItem("profilePicture");

    }

    navigate("/profile");

  };

  return (

    <section className="edit-profile">

      <div className="edit-card">

        <h1>
          Edit Profile
        </h1>

        <div className="avatar-upload">

          <div className="avatar-circle" onClick={handlePhotoClick}>

            {photo ? (

              <img src={photo} alt="Profile" />

            ) : (

              <FaUserCircle className="avatar-placeholder" />

            )}

            <div className="avatar-overlay">
              <FaCamera />
            </div>

          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            hidden
          />

          <span onClick={handlePhotoClick}>
            Upload Profile Picture
          </span>

        </div>

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
