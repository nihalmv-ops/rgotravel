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
import Weather from "./pages/Weather/Weather";
import DestinationDetails from "./pages/DestinationDetails/DestinationDetails";
import Blog from "./pages/Blog/Blog";
import BlogPost from "./pages/BlogPost/BlogPost";
import Compare from "./pages/Compare/Compare";
import CostCalculator from "./pages/CostCalculator/CostCalculator";
import Chatbot from "./components/Chatbot/Chatbot";

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

<Route path="/weather" element={<Weather />} />

<Route path="/destination/:id" element={<DestinationDetails />} />

<Route path="/blog" element={<Blog />} />

<Route path="/blog/:slug" element={<BlogPost />} />

<Route path="/compare" element={<Compare />} />

<Route path="/cost-calculator" element={<CostCalculator />} />



      </Routes>
        <Footer />
        <Chatbot />
    </>
  );
}

export default App;
