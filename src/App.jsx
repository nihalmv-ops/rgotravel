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

import Profile from "./pages/Profile/Profile";
import MyBookings from "./pages/MyBookings/MyBookings";
import Settings from "./pages/Settings/Settings";
import EditProfile from "./pages/EditProfile/EditProfile";

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
<Route path="/profile" element={<Profile />} />

<Route path="/my-bookings" element={<MyBookings />} />

<Route path="/settings" element={<Settings />} />

<Route path="/edit-profile" element={<EditProfile />} />



      </Routes>
        <Footer />
    </>
  );
}

export default App;