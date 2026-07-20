import "./Booking.css";

function Booking() {

    return (

        <section className="booking-page">

            <div className="booking-container">

                <h1>

                    Book Your Dream Trip

                </h1>

                <p>

                    Complete the form below to reserve your unforgettable journey.

                </p>

                <form className="booking-form">

                    <input
                        type="text"
                        placeholder="Full Name"
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                    />

                    <input
                        type="tel"
                        placeholder="Phone Number"
                    />

                    <select>

                        <option>
                            Select Destination
                        </option>

                        <option>Maldives</option>

                        <option>Bali</option>

                        <option>Dubai</option>

                        <option>Paris</option>

                        <option>Switzerland</option>

                    </select>

                    <input
                        type="date"
                    />

                    <input
                        type="number"
                        placeholder="Number of Travelers"
                    />

                    <textarea
                        rows="5"
                        placeholder="Special Request..."
                    ></textarea>

                    <button>

                        Confirm Booking

                    </button>

                </form>

            </div>

        </section>

    );

}

export default Booking;