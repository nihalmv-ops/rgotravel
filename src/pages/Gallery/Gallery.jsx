import "./Gallery.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import gallery from "../../data/galleryData";
import GalleryCard from "../../components/Gallery/GalleryCard";

const filters = [
  "All",
  "Beach",
  "Mountain",
  "City",
  "Nature",
  "Adventure",
];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    activeFilter === "All"
      ? gallery
      : gallery.filter((item) => item.category === activeFilter);

  return (
    <section className="gallery-page">

      {/* Hero */}

      <div className="gallery-hero">

        <h1>Travel Gallery</h1>

        <p>
          Explore Beautiful Places Around The World
        </p>

      </div>

      {/* Filter */}

      <div className="gallery-filter">

        {filters.map((item) => (

          <button
            key={item}
            className={activeFilter === item ? "active" : ""}
            onClick={() => setActiveFilter(item)}
          >
            {item}
          </button>

        ))}

      </div>

      {/* Masonry Grid */}

      <motion.div
        layout
        className="gallery-grid"
      >

        <AnimatePresence>

          {filteredImages.map((item) => (

            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => setSelectedImage(item)}
            />

          ))}

        </AnimatePresence>

      </motion.div>

      {/* Lightbox */}

      <AnimatePresence>

        {selectedImage && (

          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>

            <motion.img
              src={selectedImage.image}
              alt={selectedImage.title}
              initial={{ scale: .8 }}
              animate={{ scale: 1 }}
              exit={{ scale: .8 }}
            />

            <div className="lightbox-info">

              <h2>{selectedImage.title}</h2>

              <p>{selectedImage.country}</p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}

export default Gallery;