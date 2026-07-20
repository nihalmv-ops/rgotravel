import "./Packages.css";

import { Link } from "react-router-dom";


import {
FaHeart,
FaClock,
FaUsers,
FaMapMarkerAlt,
FaStar
} from "react-icons/fa";

function PackageCard({image,title,location,days,people,price,rating}){

return(

<div className="package-card">

<div className="package-image">

<img src={image} alt={title}/>

<div className="wishlist">
<FaHeart/>
</div>

</div>

<div className="package-content">

<div className="top-row">

<span>
<FaStar/>
{rating}
</span>

<span>
<FaMapMarkerAlt/>
{location}
</span>

</div>

<h3>{title}</h3>

<div className="info">

<span>
<FaClock/>
{days}
</span>

<span>
<FaUsers/>
{people}
</span>

</div>

<div className="bottom">

<h2>{price}</h2>
<Link to="/booking">

    <button className="book-btn">

        Book Now

    </button>

</Link>

</div>

</div>

</div>

);

}

export default PackageCard;