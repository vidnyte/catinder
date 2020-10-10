import React from "react";
import "./styles.css";

const imagePath = process.env.PUBLIC_URL + "/assets/images/catinder-logo.svg";

function Footer() {
  return (
    <footer className="App-footer">
      <img src={imagePath} className="footer-image" alt="Catinder logo" />
      <p>Catinder - find your companion!</p>
    </footer>
  );
}

export default Footer;
