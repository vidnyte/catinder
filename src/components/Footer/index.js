import React from "react";
import "./styles.css";

const imagePath = process.env.PUBLIC_URL + "/assets/images/catinder-logo.svg";

function Footer() {
  return (
    <footer className="footer-wrapper">
      <p className="footer-subtitle">Catinder - find your companion!</p>
      <img src={imagePath} className="footer-image" alt="Catinder logo" />
    </footer>
  );
}

export default Footer;
