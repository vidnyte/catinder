import React from "react";
import LocalizedStrings from "react-localization";
import "./styles.css";
import langFile from "./../../lang.json";

const lang = new LocalizedStrings(langFile);

const logoPath =
  process.env.PUBLIC_URL + "/assets/images/catinder-logo-alt.svg";

function Header() {
  return (
    <header className="App-header">
      <header className="navbar row-no-margin">
        <section className="logo-wrapper col-sm-12 col-md-6">
          <img src={logoPath} className="logo-image" alt="Catinder logo" />
        </section>
        <section className="logo-wrapper col-sm-12 col-md-6">
          <span href="#" className="catinder-logo">
            Catinder
          </span>
        </section>
      </header>
    </header>
  );
}

export default Header;
