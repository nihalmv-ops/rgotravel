import "./About.css";
import { Link } from "react-router-dom";

import {
    FaGlobeAsia,
    FaUsers,
    FaAward,
    // FaImages,
    FaArrowRight
} from "react-icons/fa";
import aboutImage from "../../assets/images/about.jpg";

function About() {

    return (

        <section className="about" id="about">

            <div className="about-container">

                {/* Left */}

                <div className="about-image">

                    <img
                        src={aboutImage}
                        alt="GoTravel"
                    />

                    <div className="experience-card">

                        <h2>10+</h2>

                        <p>Years of Experience</p>

                    </div>

                </div>

                {/* Right */}

                <div className="about-content">

                    <span className="about-tag">

                        ABOUT GOTRAVEL

                    </span>

                    <h2>

                        Explore The World
                        <span> With Confidence</span>

                    </h2>

                    <p>

                        GoTravel helps thousands of travelers discover
                        breathtaking destinations across the world.
                        From relaxing beaches to exciting adventures,
                        we create unforgettable travel experiences.

                    </p>

                    <div className="about-features">

                        <div className="feature-item">

                            <FaGlobeAsia />

                            <span>
                                150+ Destinations
                            </span>

                        </div>

                        <div className="feature-item">

                            <FaUsers />

                            <span>
                                10K+ Happy Travelers
                            </span>

                        </div>

                        <div className="feature-item">

                            <FaAward />

                            <span>
                                Award Winning Service
                            </span>

                        </div>

                    </div>

                    <div className="about-buttons">

                    <Link to="/gallery">
                  <button className="gallery-btn">
              Explore Gallery
  </button>
  </Link>

                       <Link to="/contact">

                <button className="learn-btn">

        Contact Us

        <FaArrowRight />

    </button>

      </Link>
                    </div>

                </div>

            </div>

        </section>

    );

}

export default About;