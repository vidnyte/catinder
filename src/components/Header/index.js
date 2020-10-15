import React from "react";
import "./styles.css";

const logoPath =
  process.env.PUBLIC_URL + "/assets/images/catinder-logo-alt.svg";

function Header(props) {
  return (
    <header className="App-header" data-testid="app-header">
      <header className="navbarCenter">
        <section className="logo-wrapper">
          <div
            className="tooltip tooltip-bottom cursorPointer"
            data-tooltip="Click me for more MEOWS!"
            onClick={() =>
              props.changeLanguage(props.language === "ca" ? "en" : "ca")
            }
          >
            <img
              src={logoPath}
              className="logo-image"
              alt="Catinder logo"
              data-testid="catinder-logo-image"
            />
          </div>
        </section>
        <section className="logo-wrapper">
          <span className="catinder-logo" data-testid="catinder-logo-text">
            Catinder
          </span>
        </section>
      </header>
    </header>
  );
}

export default Header;
