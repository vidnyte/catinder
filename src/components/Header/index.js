import React from "react";
import LocalizedStrings from "react-localization";
import "./styles.css";
import langFile from "./../../lang.json";

const lang = new LocalizedStrings(langFile);

const logoPath =
  process.env.PUBLIC_URL + "/assets/images/catinder-logo-alt.svg";
const GitHubPath =
  process.env.PUBLIC_URL + "/assets/images/github-logo-light.png";

function Header() {
  return (
    <header className="App-header">
      <header className="navbar">
        <section className="navbar-center">
          <img src={logoPath} className="logo-image" alt="Catinder logo" />
        </section>
        <section className="navbar-section">
          <span href="#" className="catinder-logo">
            Catinder
          </span>
        </section>

        <section className="navbar-section">
          <a
            href="https://github.com/vidnyte/catinder"
            className="catinder-navi"
          >
            <img
              src={GitHubPath}
              className="logo-github"
              alt="Catinder GitHub Repository"
            />
          </a>
        </section>
      </header>
    </header>
  );
}

export default Header;
