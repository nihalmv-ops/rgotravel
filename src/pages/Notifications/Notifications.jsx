import "./Notifications.css";
import { useEffect, useState } from "react";

import {
  FaCheckCircle,
  FaPlaneDeparture,
  FaHeart,
  FaMoneyCheckAlt,
  FaGift,
  FaStar
} from "react-icons/fa";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem("notifications")) || [];

    setNotifications(data);

  }, []);

  return (

    <section className="notifications-page">

      <div className="notifications-container">

        <h1>Notifications</h1>

        <p>Your latest travel updates.</p>

        {notifications.length === 0 ? (

          <div className="empty-notification">

            <h2>No Notifications Yet</h2>

          </div>

        ) : (

          notifications.map((item) => (

            <div
              className="notification-card"
              key={item.id}
            >

              <div className="notification-icon">

                {item.type === "booking" && <FaCheckCircle />}

                {item.type === "trip" && <FaPlaneDeparture />}

                {item.type === "wishlist" && <FaHeart />}

                {item.type === "payment" && <FaMoneyCheckAlt />}

                {item.type === "offer" && <FaGift />}

                {item.type === "review" && <FaStar />}

              </div>

              <div>

                <h3>{item.title}</h3>

                <p>{item.message}</p>

                <small>{item.date}</small>

              </div>

            </div>

          ))

        )}

      </div>

    </section>

  );

}

export default Notifications;