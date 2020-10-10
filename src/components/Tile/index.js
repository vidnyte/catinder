import React from "react";
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
    return (
      <div className="tile">
        <div className="tile-icon">
          <div className="example-tile-icon">
            <img className={"tile-image"} src={this.props.imageUrl} />
          </div>
        </div>
        <div className="tile-content">
          <p className="tile-title">The Avengers</p>
          <p className="tile-subtitle">
            Earth's Mightiest Heroes joined forces to take on threats that were
            too big for any one hero to tackle...
          </p>
        </div>
        <div className="tile-action">
          <button className="btn btn-primary">Join</button>
        </div>
      </div>
    );
  }
}

export default Tile;
