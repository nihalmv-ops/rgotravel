import "./Testimonials.css";

import testimonials from "../../data/testimonials";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

import { FaStar } from "react-icons/fa";

function Testimonials() {

  return (

    <section className="testimonials">

      <div className="testimonial-heading">

        <p>TESTIMONIALS</p>

        <h2>What Our Travelers Say</h2>

      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >

        {testimonials.map((item) => (

          <SwiperSlide key={item.id}>

            <div className="testimonial-card">

              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>

              <span>{item.country}</span>

              <div className="stars">

                {[...Array(item.rating)].map((_, index) => (
                  <FaStar key={index} />
                ))}

              </div>

              <p>{item.review}</p>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>

  );

}

export default Testimonials;