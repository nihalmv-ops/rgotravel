import "./ShareDestination.css";

import { useState } from "react";

import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaLink,
  FaCheck
} from "react-icons/fa";

function ShareDestination({ title, url }) {

  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;

  const shareText = `Check out ${title} on GoTravel!`;

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(shareUrl);

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);

    } catch {

      alert("Couldn't copy the link automatically. Please copy it from the address bar.");

    }

  };

  const handleFacebook = () => {

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );

  };

  const handleWhatsapp = () => {

    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      "_blank"
    );

  };

  const handleInstagram = async () => {

    // Instagram has no web share-link API, so copy the link and
    // send the person to Instagram to paste it themselves.
    await handleCopy();

    window.open("https://www.instagram.com/", "_blank");

  };

  return (

    <div className="share-destination">

      <span className="share-label">Share:</span>

      <button className="share-btn facebook" onClick={handleFacebook} title="Share on Facebook">
        <FaFacebook />
      </button>

      <button className="share-btn whatsapp" onClick={handleWhatsapp} title="Share on WhatsApp">
        <FaWhatsapp />
      </button>

      <button className="share-btn instagram" onClick={handleInstagram} title="Share on Instagram">
        <FaInstagram />
      </button>

      <button className="share-btn copy" onClick={handleCopy} title="Copy Link">
        {copied ? <FaCheck /> : <FaLink />}
        {copied && <span className="copied-label">Copied!</span>}
      </button>

    </div>

  );

}

export default ShareDestination;
