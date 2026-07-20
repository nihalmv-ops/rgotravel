import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
        <Footer />
    </>
  );
}

export default App;