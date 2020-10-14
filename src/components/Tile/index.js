import React from "react";
import Zoom from "react-reveal/Zoom";
import LocalizedStrings from "react-localization";
import Loader from "react-loader-spinner";
import { MdFavorite } from "react-icons/md";
import { getBreedImage } from "./../../controllers/cat";
import "./styles.css";

import langFile from "./../../lang.json";

const lang = new LocalizedStrings(langFile);

// Thanks to Louis Hoebregts
// for the particle functions
// https://css-tricks.com/playing-with-particles-using-the-web-animations-api/

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      loadingImage: true,
      showAnim: false,
    };

    this.newImage = this.newImage.bind(this);
    this.heartPop = this.heartPop.bind(this);
    this.createParticle = this.createParticle.bind(this);
  }

  async componentDidMount() {
    try {
      const data = await getBreedImage(this.props.breed);
      this.setState({
        imageUrl: data[0].url,
        loadingImage: false,
      });
    } catch (e) {
      console.log("Error loading breed image: ", e);
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props.language !== nextProps.language) {
      lang.setLanguage(nextProps.language);
      this.forceUpdate();
    }
  }

  heartPop(target) {
    if (this.state.showAnim) {
      const rect = target.getBoundingClientRect();

      const xCenter = (rect.right + rect.left) / 2;
      const yCenter = (rect.top + rect.bottom) / 2;

      for (let i = 0; i < 32; i++) {
        this.createParticle(xCenter, yCenter);
      }
    }
    this.setState({ showAnim: true });
  }

  createParticle(x, y) {
    const particle = document.createElement("particle");
    document.body.appendChild(particle);

    const size = Math.floor(Math.random() * 23 + 10);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = `hsl(${Math.random() * 100 + 250}, 80%, 60%)`;
    const destinationX = x + (Math.random() - 0.5) * 2 * 150;
    const destinationY = y + (Math.random() - 0.5) * 2 * 150;

    const animation = particle.animate(
      [
        {
          transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
          opacity: 1,
        },
        {
          transform: `translate(${destinationX}px, ${destinationY}px)`,
          opacity: 0,
        },
      ],
      {
        duration: 900 + Math.random() * 1100,
        easing: "cubic-bezier(0, .9, .57, 1)",
        delay: Math.random() * 300,
      }
    );

    animation.onfinish = () => {
      particle.remove();
    };
  }

  async newImage() {
    if (!this.state.loadingImage) {
      this.setState({ imageUrl: "" });
      try {
        const data = await getBreedImage(this.props.breed);
        this.setState({
          imageUrl: data[0].url,
          loadingImage: false,
        });
      } catch (e) {
        console.log("Error loading new breed image: ", e);
      }
    }
  }

  render() {
    const temperaments = [];
    const temperamentList = this.props.data.temperament.split(",");
    temperamentList.map((temp) => {
      temperaments.push(
        <span
          key={`${this.props.data.name}_${temp}`}
          style={{
            background: "#3f3d56",
            color: this.props.favorited ? "white" : "#ffd4d4",
          }}
          className="chip"
        >
          {temp}
        </span>
      );
      return null;
    });

    const validAltName = this.props.data.alt_names
      ? this.props.data.alt_names.trim()
      : false;

    return (
      <div className="bottom-margin tile-grid" data-testid="tile-wrapper">
        <Zoom duration={250}>
          <div
            className="card card-grid"
            style={{
              background: this.props.favorited
                ? "rgb(255, 218, 223)"
                : "#e4e5e7",
            }}
          >
            <div
              className="card-image tooltip"
              data-tooltip={lang.random.cuteKittens}
              onClick={(e) => {
                this.newImage(e);
              }}
            >
              {this.state.imageUrl ? (
                <img
                  src={this.state.imageUrl}
                  alt={this.props.data.name}
                  className="breed-image"
                  onLoad={(e) => {
                    this.heartPop(e.target);
                  }}
                />
              ) : (
                <Loader
                  type="ThreeDots"
                  color="#ff072a"
                  height={"15rem"}
                  width={"7rem"}
                />
              )}
            </div>
            <div className="card-header">
              <div className="card-title h3" data-testid="tile-name">
                {this.props.data.name}
              </div>
            </div>
            <div className="card-body">
              {validAltName && (
                <div className="card-subtitle">
                  <div className="h5 card-alt" data-testid="tile-altname">
                    {validAltName}
                  </div>
                </div>
              )}

              <div className="card-subtitle text-gray">{temperaments}</div>
              <div className="card-description" data-testid="tile-description">
                {this.props.data.description}
              </div>
              <div className="card-subtitle text-gray">
                <span className="card-bold">
                  {lang.tile.origin}: {this.props.data.origin}
                </span>
                <br />
                <span className="card-bold">
                  {`${lang.tile.lifeSpan}: ${this.props.data.life_span} ${lang.tile.years}`}
                </span>
                <br />
                <span className="card-bold">
                  {lang.tile.adaptability}: {this.props.data.adaptability} / 5
                </span>
              </div>
              <div className="card-bottom">
                <MdFavorite
                  id="heart"
                  style={{
                    color: this.props.favorited ? "#ff072a" : "rgb(63, 61, 86)",
                    width: "3.8rem",
                    height: "3.8rem",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.props.handleFavoriteClick(this.props.data);
                  }}
                />
                <button
                  className={
                    !this.props.favorited
                      ? "btn btn-primary"
                      : "btn btn-secondary"
                  }
                  onClick={() =>
                    this.props.handleFavoriteClick(this.props.data)
                  }
                >
                  {this.props.favorited
                    ? lang.tile.removeFromFavorites
                    : lang.tile.addToFavorites}
                </button>
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    );
  }
}

export default Tile;
