import React from "react";
import Zoom from "react-reveal/Zoom";
import LocalizedStrings from "react-localization";
import Loader from "react-loader-spinner";
import { MdFavorite } from "react-icons/md";
import { getBreedImage } from "./../../controllers/cat";
import "./styles.css";

import langFile from "./../../lang.json";

const lang = new LocalizedStrings(langFile);

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false,
      imageUrl: "",
    };

    this.open = this.open.bind(this);
    this.newImage = this.newImage.bind(this);
  }

  componentDidMount() {
    getBreedImage()
      .then((data) => {
        this.setState({
          imageUrl: data[0].url,
        });
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  componentDidUpdate(nextProps) {
    if (this.props.language !== nextProps.language) {
      lang.setLanguage(nextProps.language);
      this.forceUpdate();
    }
  }

  newImage() {
    this.setState({ imageUrl: "" }, () => {
      getBreedImage()
        .then((data) => {
          this.setState({
            imageUrl: data[0].url,
          });
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    });
  }

  open() {
    this.setState({
      open: true,
    });
  }

  render() {
    const temperaments = [];
    const temperamentList = this.props.data.temperament.split(",");
    temperamentList.map((temp) => {
      temperaments.push(
        <span
          key={`${this.props.data.name}_${temp}`}
          style={{ background: "#3f3d56", color: "#ffd4d4" }}
          className="chip"
        >
          {temp}
        </span>
      );
    });

    return (
      <div className="col-sm-12 col-md-4">
        <Zoom duration={250}>
          <div className="card">
            <div
              className="card-image tooltip"
              data-tooltip={lang.random.cuteKittens}
              onClick={() => this.newImage()}
            >
              {this.state.imageUrl ? (
                <img src={this.state.imageUrl} className="breed-image" />
              ) : (
                <Loader
                  type="ThreeDots"
                  color="#ff072a"
                  height={100}
                  width={100}
                />
              )}
            </div>
            <div className="card-header">
              <div className="card-title h3">{this.props.data.name}</div>
            </div>
            <div className="card-body">
              <div className="card-subtitle">
                <div className="h5 card-alt">{`${
                  this.props.data.alt_names ? this.props.data.alt_names : ""
                }`}</div>
              </div>
              <div className="card-subtitle text-gray">{temperaments}</div>
              <div className="card-description">
                {this.props.data.description}
              </div>
              <div className="card-subtitle text-gray">
                <span className="card-bold">
                  {lang.tile.origin}: {this.props.data.origin}
                </span>
                <br />
                <span className="card-bold">
                  {lang.tile.lifeSpan}: {this.props.data.life_span} years
                </span>
                <br />
                <span className="card-bold">
                  {lang.tile.adaptability}: {this.props.data.adaptability} / 5
                </span>
              </div>
            </div>
            <div className="card-footer">
              <MdFavorite
                style={{
                  color: this.props.favorited ? "#ff072a" : "rgb(63, 61, 86)",
                  width: "3rem",
                  height: "3rem",
                  padding: "0.5rem",
                }}
                onClick={() => this.props.handleFavoriteClick(this.props.data)}
              />
              <button
                className={
                  !this.props.favorited
                    ? "btn btn-primary"
                    : "btn btn-secondary"
                }
                onClick={() => this.props.handleFavoriteClick(this.props.data)}
              >
                {this.props.favorited
                  ? lang.tile.removeFromFavorites
                  : lang.tile.addToFavorites}
              </button>
            </div>
          </div>
        </Zoom>
      </div>
    );
  }
}

export default Tile;
