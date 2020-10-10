import React from "react";
import "./styles.css";

class Results extends React.Component {
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
    return <div className="results-wrapper" onClick={this.open}></div>;
  }
}

export default Results;
