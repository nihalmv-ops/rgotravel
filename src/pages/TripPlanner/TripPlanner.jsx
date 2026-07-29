import "./TripPlanner.css";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaWallet,
  FaCalendarAlt,
  FaMagic,
  FaRedo,
  FaDownload
} from "react-icons/fa";

import {
  destinationPools,
  genericPool,
  getBudgetTier
} from "../../data/tripPlannerData";

import { generateTripPlanPDF } from "../../utils/generateTripPlanPDF";

function shuffle(array) {

  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];

  }

  return copy;

}

function buildItinerary(destination, days) {

  const key = destination.trim().toLowerCase();

  const pool = destinationPools[key] || genericPool;

  const shuffled = shuffle(pool);

  const itinerary = [];

  for (let i = 0; i < days; i++) {

    itinerary.push(shuffled[i % shuffled.length]);

  }

  return itinerary;

}

function TripPlanner() {

  const [form, setForm] = useState({
    destination: "",
    budget: "",
    days: ""
  });

  const [plan, setPlan] = useState(null);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

  };

  const generatePlan = () => {

    if (!form.destination || !form.budget || !form.days) {

      alert("Please fill in destination, budget, and number of days.");

      return;

    }

    const days = Math.min(Math.max(Number(form.days), 1), 14);

    const { tier, tip } = getBudgetTier(form.budget, days);

    const itinerary = buildItinerary(form.destination, days);

    setPlan({
      destination: form.destination,
      budget: form.budget,
      days,
      tier,
      tip,
      itinerary
    });

  };

  const regenerate = () => {

    if (!plan) return;

    const itinerary = buildItinerary(plan.destination, plan.days);

    setPlan((prev) => ({ ...prev, itinerary }));

  };

  return (

    <section className="planner-page">

      <div className="planner-container">

        <div className="planner-intro">

          <FaMagic className="planner-icon" />

          <h1>AI Trip Planner</h1>

          <p>
            Tell us your destination, budget, and trip length —
            we'll generate a day-by-day itinerary for you.
          </p>

        </div>

        <div className="planner-form">

          <div className="input-box">

            <FaMapMarkerAlt />

            <input
              type="text"
              name="destination"
              placeholder="Destination (e.g. Bali)"
              value={form.destination}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <FaWallet />

            <input
              type="number"
              name="budget"
              placeholder="Budget ($)"
              value={form.budget}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <FaCalendarAlt />

            <input
              type="number"
              name="days"
              placeholder="Number of Days"
              value={form.days}
              onChange={handleChange}
            />

          </div>

          <button onClick={generatePlan}>
            <FaMagic />
            Generate Plan
          </button>

        </div>

        <AnimatePresence>

          {plan && (

            <motion.div
              className="planner-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >

              <div className="result-header">

                <div>

                  <h2>{plan.destination}</h2>

                  <p>
                    Budget: ${plan.budget} &nbsp;•&nbsp; {plan.days} Day(s)
                    &nbsp;•&nbsp; <span className="tier">{plan.tier}</span>
                  </p>

                </div>

                <div className="result-actions">

                  <button onClick={regenerate}>
                    <FaRedo />
                    Regenerate
                  </button>

                  <button
                    className="primary"
                    onClick={() => generateTripPlanPDF(plan)}
                  >
                    <FaDownload />
                    Download PDF
                  </button>

                </div>

              </div>

              <p className="budget-tip">
                💡 {plan.tip}
              </p>

              <div className="itinerary-list">

                {plan.itinerary.map((day, index) => (

                  <motion.div
                    className="day-card"
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >

                    <div className="day-number">
                      Day {index + 1}
                    </div>

                    <div>

                      <h3>{day.title}</h3>

                      <p>{day.desc}</p>

                    </div>

                  </motion.div>

                ))}

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </section>

  );

}

export default TripPlanner;
