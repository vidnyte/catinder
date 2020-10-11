import React from "react";
import "./styles.css";
import Fade from "react-reveal/Fade";

const GitHubPath =
  process.env.PUBLIC_URL + "/assets/images/github-logo-light.png";

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
        <a href="https://github.com/vidnyte/catinder" className="catinder-navi">
          <img
            src={GitHubPath}
            className="logo-github"
            alt="Catinder GitHub Repository"
          />
        </a>
        <span>Copyright &#169; 2020 Catinder</span>
      </footer>
    </Fade>
  );
}

export default Footer;
