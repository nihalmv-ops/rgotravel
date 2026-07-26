import "./Settings.css";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
  FaMoon,
  FaBell,
  FaGlobe,
  FaLock,

} from "react-icons/fa";

function Settings() {

  const { darkMode, toggleDarkMode } = useAuth();

  const [notifications, setNotifications] = useState(true);

  const [privacy, setPrivacy] = useState(true);

  const [language, setLanguage] = useState("English");

  return (

    <section className="settings-page">

      <div className="settings-card">

        <h1>
          Settings
        </h1>

        <p>
          Customize your GoTravel experience.
        </p>

        {/* Dark Mode */}

        <div className="setting-item">

          <div className="setting-left">

            <FaMoon />

            <span>Dark Mode</span>

          </div>

          <label className="switch">

           <input
  type="checkbox"
  checked={darkMode}
  onChange={toggleDarkMode}
    />

            <span className="slider"></span>

          </label>

        </div>

        {/* Notifications */}

        <div className="setting-item">

          <div className="setting-left">

            <FaBell />

            <span>Notifications</span>

          </div>

          <label className="switch">

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />

            <span className="slider"></span>

          </label>

        </div>

        {/* Language */}

        <div className="setting-item">

          <div className="setting-left">

            <FaGlobe />

            <span>Language</span>

          </div>

          <select
            className="setting-select"
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >

            <option>English</option>

            <option>Malayalam</option>

            <option>Hindi</option>

            <option>Arabic</option>

          </select>

        </div>

        {/* Privacy */}

        <div className="setting-item">

          <div className="setting-left">

            <FaLock />

            <span>Private Account</span>

          </div>

          <label className="switch">

            <input
              type="checkbox"
              checked={privacy}
              onChange={() =>
                setPrivacy(!privacy)
              }
            />

            <span className="slider"></span>

          </label>

        </div>

        {/* Delete Account */}

        <button className="delete-btn">

          

           Delete Account

        </button>

      </div>

    </section>

  );

}

export default Settings;