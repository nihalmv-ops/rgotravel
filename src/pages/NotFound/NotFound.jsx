import "./NotFound.css";

import { Link } from "react-router-dom";
import { FaCompass, FaHome } from "react-icons/fa";

function NotFound() {

  return (

    <section className="notfound-page">

      <div className="notfound-card">

        <FaCompass className="notfound-icon" />

        <h1>404</h1>

        <h2>Looks like you've wandered off the map</h2>

        <p>
          The page you're looking for doesn't exist or may have moved.
        </p>

        <Link to="/" className="notfound-btn">
          <FaHome />
          Back to Home
        </Link>

      </div>

    </section>

  );

}

export default NotFound;