import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import Booking from "./pages/Booking/Booking";
import ProtectedRoute 
from "./components/ProtectedRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Profile from "./pages/Profile/Profile";
import MyBookings from "./pages/MyBookings/MyBookings";
import Settings from "./pages/Settings/Settings";
import EditProfile from "./pages/EditProfile/EditProfile";
import PaymentConfirmation from "./pages/PaymentConfirmation/PaymentConfirmation";
import BookingSuccess from "./pages/BookingSuccess/BookingSuccess";
import Wishlist from "./pages/Wishlist/Wishlist";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import TripPlanner from "./pages/TripPlanner/TripPlanner";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

       <Route path="/" element={<Home />} />
<Route path="/gallery" element={<Gallery />} />
<Route path="/contact" element={<Contact />} />
<Route path="*" element={<NotFound />} />
<Route
path="/booking"
element={

<ProtectedRoute>

<Booking />

</ProtectedRoute>

}
/>

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/profile" element={<Profile />} />

<Route path="/my-bookings" element={<MyBookings />} />

<Route path="/settings" element={<Settings />} />

<Route path="/edit-profile" element={<EditProfile />} />

<Route
path="/payment-confirmation"
element={

<ProtectedRoute>

<PaymentConfirmation />

</ProtectedRoute>

}
/>

<Route
path="/booking-success"
element={

<ProtectedRoute>

<BookingSuccess />

</ProtectedRoute>

}
/>

<Route path="/wishlist" element={<Wishlist />} />

<Route path="/change-password" element={<ChangePassword />} />

<Route path="/trip-planner" element={<TripPlanner />} />



      </Routes>
        <Footer />
    </>
  );
}

export default App;
