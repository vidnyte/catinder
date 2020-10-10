import React from "react";
import Results from "./../Results";
import { searchCats } from "./../../controllers/cat";
import "./styles.css";

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false,
    };

    this.open = this.open.bind(this);
  }

  componentWillMount() {
    console.log("get cat api");

    searchCats()
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  open() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <div className="options-wrapper" onClick={this.open}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-search">
                  Search
                </label>
                <div className="has-icon-right">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search..."
                    id="input-search"
                  />
                  <i className="form-icon icon icon-search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Options;
