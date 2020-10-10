import React from "react";
import "./styles.css";

const imagePath = process.env.PUBLIC_URL + "/assets/images/catinder-logo.svg";

function Header() {
  return (
    <header className="App-header">
      <header className="navbar">
        <section className="navbar-section">
          <a href="#" className="btn btn-link">
            Docs
          </a>
          <a href="#" className="btn btn-link">
            Examples
          </a>
        </section>
        <section className="navbar-center">
          <img src={imagePath} className="logo-image" alt="Catinder logo" />
        </section>
        <section className="navbar-section">
          <a href="#" className="btn btn-link">
            Twitter
          </a>
          <a href="#" className="btn btn-link">
            GitHub
          </a>
        </section>
      </header>
    </header>
  );
}

export default Header;
