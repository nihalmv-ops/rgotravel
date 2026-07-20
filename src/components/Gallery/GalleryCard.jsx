import { motion } from "framer-motion";
import { FaHeart, FaMapMarkerAlt, FaSearchPlus } from "react-icons/fa";

function GalleryCard({ item, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="gallery-card"
    >
      {/* Image */}

      <img
        src={item.image}
        alt={item.title}
      />

      {/* Category */}

      <div className="category-badge">
        {item.category}
      </div>

      {/* Like Button */}

      <button className="like-btn">

        <FaHeart />

      </button>

      {/* Zoom Button */}

      <button
        className="zoom-btn"
        onClick={onClick}
      >

        <FaSearchPlus />

      </button>

      {/* Glass Overlay */}

      <div className="gallery-overlay">

        <div className="overlay-content">

          <h3>
            {item.title}
          </h3>

          <p>

            <FaMapMarkerAlt />

            {item.country}

          </p>

        </div>

      </div>

    </motion.div>
  );
}

export default GalleryCard;