import "./Packages.css";
import { useMemo } from "react";
import initialPackages from "../../data/packages";
import PackageCard from "./PackageCard";

function Packages() {
  const packagesList = useMemo(() => {
    const saved = localStorage.getItem("admin_packages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return initialPackages;
  }, []);

  return (
    <section className="packages" id="packages">
      <div className="package-heading">
        <p>POPULAR PACKAGES</p>
        <h2>Choose Your Dream Tour</h2>
      </div>

      <div className="package-grid">
        {packagesList.map((item) => (
          <PackageCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

export default Packages;