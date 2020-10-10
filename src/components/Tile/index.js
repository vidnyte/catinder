import React from "react";
import Zoom from "react-reveal/Zoom";
import "./styles.css";

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false,
    };

    this.open = this.open.bind(this);
  }

  open() {
    this.setState({
      open: true,
    });
  }

  render() {
    const temperaments = [];
    const temperamentList = this.props.data.temperament.split(", ");
    temperamentList.map((temp) => {
      temperaments.push(
        <span key={`${this.props.data.name}_${temp}`} className="chip">
          {temp}
        </span>
      );
    });

    return (
      <div className="col-12 col-sm-6 col-md-4">
        <Zoom duration={250}>
          <div className="card">
            <div className="card-image">
              <img src={this.props.imageUrl} className="img-responsive" />
            </div>
            <div className="card-header">
              <div className="card-title h5">{this.props.data.name}</div>
              <div className="card-subtitle text-gray">
                {this.props.data.alt_names}
                {temperaments}
              </div>
            </div>
            <div className="card-body">
              {this.props.data.description}
              <div className="card-subtitle text-gray">
                Origin: {this.props.data.origin}
                <br />
                Life span: {this.props.data.life_span}
                <br />
                Adaptability: {this.props.data.adaptability}
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary">Add to Favorites</button>
            </div>
          </div>
        </Zoom>
      </div>
    );
  }
}

export default Tile;
