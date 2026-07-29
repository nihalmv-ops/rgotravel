import "./DestinationDetails.css";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  FaStar,
  FaCalendarAlt,
  FaHotel,
  FaUtensils,
  FaMapMarkerAlt,
  FaArrowLeft
} from "react-icons/fa";

import destinations from "../../data/destinations";
import destinationDetails from "../../data/destinationDetails";

import ShareDestination from "../../components/ShareDestination/ShareDestination";
import { recordRecentlyViewed } from "../../components/RecentlyViewed/RecentlyViewed";

function DestinationDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const place = destinations.find((d) => String(d.id) === id);
  const details = destinationDetails[id];

  const [activeImage, setActiveImage] = useState(0);

  const [reviews, setReviews] = useState(
    () => JSON.parse(localStorage.getItem(`reviews-${id}`)) || []
  );

  const [reviewForm, setReviewForm] = useState({ name: "", comment: "", rating: 5 });

  useEffect(() => {

    if (place) recordRecentlyViewed(place.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!place) {

    return (

      <section className="details-page">

        <div className="details-not-found">

          <h1>Destination not found</h1>

          <Link to="/#destinations">Back to Destinations</Link>

        </div>

      </section>

    );

  }

  // Only one image asset per destination currently exists, so the
  // "gallery" reuses it — swap in more photos here as they're added.
  const gallery = [place.image];

  const handleReviewSubmit = (e) => {

    e.preventDefault();

    if (!reviewForm.name || !reviewForm.comment) {

      alert("Please add your name and a comment.");

      return;

    }

    const next = [
      { ...reviewForm, date: new Date().toLocaleDateString() },
      ...reviews
    ];

    setReviews(next);

    localStorage.setItem(`reviews-${id}`, JSON.stringify(next));

    setReviewForm({ name: "", comment: "", rating: 5 });

  };

  const handleBookNow = () => {

    navigate("/booking", {
      state: {
        packageData: {
          image: place.image,
          title: place.name,
          location: place.country,
          price: place.price
        }
      }
    });

  };

  return (

    <section className="details-page">

      <div className="details-container">

        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </button>

        {/* GALLERY */}

        <div className="gallery">

          <img src={gallery[activeImage]} alt={place.name} className="gallery-main" />

          <div className="gallery-thumbs">

            {gallery.map((img, index) => (

              <img
                key={index}
                src={img}
                alt={`${place.name} ${index + 1}`}
                className={activeImage === index ? "active" : ""}
                onClick={() => setActiveImage(index)}
              />

            ))}

          </div>

        </div>

        {/* HEADER */}

        <div className="details-header">

          <div>

            <h1>{place.name}</h1>

            <p>
              <FaMapMarkerAlt />
              {place.country}
              &nbsp;•&nbsp;
              <FaStar />
              {place.rating}
            </p>

          </div>

          <div className="header-right">

            <h2>{place.price}</h2>

            <button className="book-now-btn" onClick={handleBookNow}>
              Book Now
            </button>

          </div>

        </div>

        <ShareDestination title={place.name} />

        {/* OVERVIEW */}

        <div className="details-section">

          <h3>Overview</h3>

          <p>{details.overview}</p>

        </div>

        {/* BEST TIME */}

        <div className="details-section">

          <h3>
            <FaCalendarAlt />
            Best Time to Visit
          </h3>

          <p>{details.bestTime}</p>

        </div>

        {/* THINGS TO DO */}

        <div className="details-section">

          <h3>Things to Do</h3>

          <ul className="bullet-list">

            {details.thingsToDo.map((item, index) => (
              <li key={index}>{item}</li>
            ))}

          </ul>

        </div>

        {/* HOTELS */}

        <div className="details-section">

          <h3>
            <FaHotel />
            Hotels
          </h3>

          <div className="mini-grid">

            {details.hotels.map((hotel, index) => (

              <div className="mini-card" key={index}>

                <h4>{hotel.name}</h4>

                <p>{hotel.price}</p>

                <span>
                  <FaStar />
                  {hotel.rating}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* RESTAURANTS */}

        <div className="details-section">

          <h3>
            <FaUtensils />
            Restaurants
          </h3>

          <div className="mini-grid">

            {details.restaurants.map((r, index) => (

              <div className="mini-card" key={index}>

                <h4>{r.name}</h4>

                <p>{r.cuisine}</p>

                <span>{r.price}</span>

              </div>

            ))}

          </div>

        </div>

        {/* REVIEWS */}

        <div className="details-section">

          <h3>Reviews</h3>

          <form className="review-form" onSubmit={handleReviewSubmit}>

            <input
              type="text"
              placeholder="Your name"
              value={reviewForm.name}
              onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
            />

            <select
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
            >

              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
              ))}

            </select>

            <textarea
              rows="3"
              placeholder="Share your experience..."
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
            />

            <button type="submit">Submit Review</button>

          </form>

          <div className="review-list">

            {reviews.length === 0 && (
              <p className="no-reviews">No reviews yet — be the first!</p>
            )}

            {reviews.map((review, index) => (

              <div className="review-card" key={index}>

                <div className="review-top">

                  <strong>{review.name}</strong>

                  <span>
                    {"⭐".repeat(review.rating)}
                  </span>

                </div>

                <p>{review.comment}</p>

                <span className="review-date">{review.date}</span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}

export default DestinationDetails;
