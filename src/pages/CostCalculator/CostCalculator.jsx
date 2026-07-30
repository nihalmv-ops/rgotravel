import "./CostCalculator.css";

import { useState } from "react";

import {
  FaHotel,
  FaPlane,
  FaUtensils,
  FaBus,
  FaHiking,
  FaCalculator
} from "react-icons/fa";

function CostCalculator() {

  const [costs, setCosts] = useState({
    hotel: "",
    flights: "",
    food: "",
    transport: "",
    activities: ""
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setCosts((prev) => ({ ...prev, [name]: value }));

  };

  const total = Object.values(costs).reduce(
    (sum, val) => sum + (Number(val) || 0),
    0
  );

  const fields = [
    { key: "hotel", label: "Hotel", icon: <FaHotel /> },
    { key: "flights", label: "Flights", icon: <FaPlane /> },
    { key: "food", label: "Food", icon: <FaUtensils /> },
    { key: "transport", label: "Transport", icon: <FaBus /> },
    { key: "activities", label: "Activities", icon: <FaHiking /> }
  ];

  return (

    <section className="calculator-page">

      <div className="calculator-container">

        <div className="calculator-intro">

          <FaCalculator className="calculator-icon" />

          <h1>Travel Cost Calculator</h1>

          <p>Add up every expense category to estimate your total trip budget.</p>

        </div>

        <div className="calculator-card">

          {fields.map((field) => (

            <div className="cost-row" key={field.key}>

              <label>

                {field.icon}
                {field.label}

              </label>

              <div className="cost-input">

                <span>$</span>

                <input
                  type="number"
                  name={field.key}
                  min="0"
                  placeholder="0"
                  value={costs[field.key]}
                  onChange={handleChange}
                />

              </div>

            </div>

          ))}

          <div className="total-row">

            <span>Total Budget</span>

            <h2>${total.toLocaleString()}</h2>

          </div>

        </div>

      </div>

    </section>

  );

}

export default CostCalculator;
