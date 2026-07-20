import "./Packages.css";

import packages from "../../data/packages";

import PackageCard from "./PackageCard";



function Packages(){

return(

<section className="packages" id="packages">

<div className="package-heading">

<p>POPULAR PACKAGES</p>

<h2>
Choose Your Dream Tour
</h2>

</div>

<div className="package-grid">

{packages.map((item)=>(

<PackageCard
key={item.id}
{...item}
/>

))}

</div>

</section>

);

}

export default Packages;