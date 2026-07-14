import "./Hero.css";
import heroImage from "../../assets/images/hero.jpg";

function Hero() {
  return (
    <section
      className="hero"
      id="home"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="overlay"></div>

      <div className="hero-content">

        <p className="hero-tag">
          ✈️ Discover the Beauty of the World
        </p>

        <h1>
          Explore Your
          <span> Dream Destination</span>
        </h1>

        <p className="hero-text">
          Travel smarter, discover hidden places,
          and create unforgettable memories with GoTravel.
        </p>

        <div className="hero-buttons">

          <button className="explore-btn">
            Explore Now
          </button>

          <button className="watch-btn">
            Watch Video
          </button>

        </div>

        {/* Glass Search Box */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Where do you want to go?"
          />

          <button>
            Search
          </button>

        </div>

      </div>
<div className="scroll-indicator">

  <div className="mouse">

    <div className="wheel"></div>

  </div>

  

</div>
    </section>
  );
}

export default Hero;