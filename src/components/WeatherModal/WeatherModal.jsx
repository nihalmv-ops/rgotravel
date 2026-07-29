import "./WeatherModal.css";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

import WeatherCard from "../WeatherCard/WeatherCard";

function WeatherModal({ place, onClose }) {

  if (!place) return null;

  return (

    <AnimatePresence>

      <motion.div
        className="weather-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >

        <motion.div
          className="weather-modal-box"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >

          <button className="weather-modal-close" onClick={onClose}>
            <FaTimes />
          </button>

          <WeatherCard place={place} />

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}

export default WeatherModal;
