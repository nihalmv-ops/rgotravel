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
import { fetchPlaceById, getImageUrl } from "../../services/api";

import ShareDestination from "../../components/ShareDestination/ShareDestination";
import { recordRecentlyViewed } from "../../components/RecentlyViewed/RecentlyViewed";

function DestinationDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(() => {
    try {
      const saved = localStorage.getItem("admin_destinations");
      if (saved) {
        const parsed = JSON.parse(saved);
        const found = parsed.find((d) => String(d.id) === String(id));
        if (found) return found;
      }
    } catch (e) {
      console.error(e);
    }
    return destinations.find((d) => String(d.id) === String(id)) || null;
  });

  const [activeImage, setActiveImage] = useState(0);

  const [reviews, setReviews] = useState(
    () => JSON.parse(localStorage.getItem(`reviews-${id}`)) || []
  );

  const [reviewForm, setReviewForm] = useState({ name: "", comment: "", rating: 5 });

  useEffect(() => {
    let isMounted = true;
    fetchPlaceById(id)
      .then((data) => {
        if (isMounted && data) {
          setPlace(data);
        }
      })
      .catch((err) => {
        console.info("Could not fetch place by ID from backend:", err.message);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (place) recordRecentlyViewed(place.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, place]);

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

  const mainImage = getImageUrl(place.image);
  const gallery = [mainImage];

  const details = destinationDetails[id] || {
    overview:
      place.description ||
      place.overview ||
      `Experience the breathtaking beauty and culture of ${place.name}, ${place.country}. An unforgettable destination offering stunning landscapes, vibrant local experiences, and world-class hospitality.`,
    bestTime: place.bestTime || place.season || "October - March (Peak Season)",
    thingsToDo:
      Array.isArray(place.highlights) && place.highlights.length > 0
        ? place.highlights
        : typeof place.highlights === "string" && place.highlights.trim()
        ? place.highlights.split(",").map((s) => s.trim()).filter(Boolean)
        : [
            `Explore iconic landmarks in ${place.name}`,
            "Guided scenic sightseeing and photography",
            "Local culinary and cultural tasting tour",
            "Outdoor nature and leisure adventures"
          ],
    hotels: [
      { name: `Grand Luxury Resort ${place.name}`, price: "$180/night", rating: 4.9 },
      { name: `Boutique Heritage Inn`, price: "$120/night", rating: 4.8 },
      { name: `Scenic View Suites`, price: "$85/night", rating: 4.6 }
    ],
    restaurants: [
      { name: `The View Terrace`, type: "Fine Dining & Local Specialties", rating: 4.9 },
      { name: `Harbor & Spice Table`, type: "Regional Cuisine", rating: 4.8 },
      { name: `Sunset Coastal Cafe`, type: "Casual Dining & Cafe", rating: 4.7 }
    ]
  };

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
          id: place.id,
          image: mainImage,
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

          <img
            src={gallery[activeImage]}
            alt={place.name}
            className="gallery-main"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800";
            }}
          />

          <div className="gallery-thumbs">

            {gallery.map((img, index) => (

              <img
                key={index}
                src={img}
                alt={`${place.name} ${index + 1}`}
                className={activeImage === index ? "active" : ""}
                onClick={() => setActiveImage(index)}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800";
                }}
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
