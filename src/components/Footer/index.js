import React, { useState, useEffect } from "react";
import LocalizedStrings from "react-localization";
import Fade from "react-reveal/Fade";
import langFile from "./../../lang.json";
import "./styles.css";

const GitHubPath =
  process.env.PUBLIC_URL + "/assets/images/github-logo-light.png";

const lang = new LocalizedStrings(langFile);

function Footer(props) {
  const [myLang, setMyLang] = useState(props.language);
  lang.setLanguage(props.language);

  useEffect(() => {
    if (props.language !== myLang) {
      lang.setLanguage(props.language);
      setMyLang(props.language);
    }
  }, [props.language, myLang]);

  return (
    <Fade bottom>
      <footer className="footer-wrapper" data-testid="footer-wrapper">
        <a href="https://github.com/vidnyte/catinder" className="catinder-navi">
          <img
            src={GitHubPath}
            className="logo-github"
            alt="Catinder GitHub Repository"
            data-testid="footer-image"
          />
        </a>
        <span className="footer-subtitle">
          {lang.footer.copyright} &#169; 2020 Catinder
        </span>
      </footer>
    </Fade>
  );
}

export default Footer;
