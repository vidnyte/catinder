import React from "react";
import "./styles.css";
import Fade from "react-reveal/Fade";
import { GiBlackCat, GiNestedHearts } from "react-icons/gi";

const imagePath = process.env.PUBLIC_URL + "/assets/images/catinder-logo.svg";

const tabIconStyleLogo = {
  marginRight: "0.4rem",
  height: "2.5rem",
  width: "2.5rem",
  color: "#ff072a",
};

function Footer() {
  return (
    <Fade bottom>
      <footer className="footer-wrapper">
        <a href="https://github.com/vidnyte/catinder" className="footer-link">
          <GiBlackCat style={tabIconStyleLogo} />
        </a>
      </footer>
    </Fade>
  );
}

export default Footer;
