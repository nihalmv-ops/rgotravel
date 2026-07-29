import Hero from "../../components/Hero/Hero";
import Destinations from "../../components/Destinations/Destinations";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import About from "../../components/About/About";
import Packages from "../../components/Packages/Packages";
import Testimonials from "../../components/Testimonials/Testimonials";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";

function Home() {
  return (
    <>
      <Hero />
      <Destinations />
      <WhyChoose />
      <About />
      <Packages />
      <Testimonials />
      <RecentlyViewed />
    </>
  );
}

export default Home;
