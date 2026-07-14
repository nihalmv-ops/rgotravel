import "./WhyChoose.css";
import image from "../../assets/images/why.jpg";

import {
  FaGlobeAsia,
  FaShieldAlt,
  FaHeadset,
  FaDollarSign
} from "react-icons/fa";

function WhyChoose() {
  return (
    <section className="why">

      <div className="why-container">

        {/* Left */}

        <div className="why-content">

          <span className="section-tag">
            WHY CHOOSE US
          </span>

          <h2>
            Your Trusted Travel
            <span> Partner</span>
          </h2>

          <p>
            We help thousands of travelers discover amazing
            destinations with affordable packages, expert guides,
            and unforgettable experiences.
          </p>

          <div className="feature-list">

            <div className="feature">
              <FaDollarSign />
              <div>
                <h4>Best Price</h4>
                <p>No hidden charges.</p>
              </div>
            </div>

            <div className="feature">
              <FaShieldAlt />
              <div>
                <h4>Safe Travel</h4>
                <p>Your safety comes first.</p>
              </div>
            </div>

            <div className="feature">
              <FaGlobeAsia />
              <div>
                <h4>150+ Destinations</h4>
                <p>Worldwide travel.</p>
              </div>
            </div>

            <div className="feature">
              <FaHeadset />
              <div>
                <h4>24/7 Support</h4>
                <p>Always here to help.</p>
              </div>
            </div>

          </div>

          <button className="why-btn">
            Explore More
          </button>

        </div>

        {/* Right */}

        <div className="why-image">

          <img src={image} alt="Travel" />

          <div className="glass-card">

            <h3>10K+</h3>

            <p>Happy Travelers</p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;