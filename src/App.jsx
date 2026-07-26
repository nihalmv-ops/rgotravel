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

      </Routes>
        <Footer />
    </>
  );
}

export default App;