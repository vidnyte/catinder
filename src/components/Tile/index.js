import React from "react";
import "./styles.css";

const imagePath = process.env.PUBLIC_URL + "/assets/images/catinder-logo.svg";

function Tile() {
  return (
    <header className="tile-header">
      <img src={imagePath} className="logo-image" alt="Catinder logo" />
      <p>Catinder - find your companion!</p>
    </header>
  );
}

export default Header;
