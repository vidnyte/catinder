import dotenv from "dotenv";
import React from "react";
import LocalizedStrings from "react-localization";
import Header from "./../components/Header";
import Options from "./../components/Options";
import Footer from "./../components/Footer";
import "./styles.css";
import "./bootstrap.css";
import "./spectre.min.css";
import "./spectre-icons.min.css";

import langFile from "./../lang.json";

const lang = new LocalizedStrings(langFile);

dotenv.config();

let language = localStorage.getItem("language");

if (!language) {
  localStorage.setItem("language", "en");
  language = "en";
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      language,
    };

    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(langi) {
    this.setState({ language: langi }, () => {
      lang.setLanguage(this.state.language);
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div className="App" data-testid="app">
        <Header
          language={this.state.language}
          changeLanguage={this.changeLanguage}
        />
        <Options language={this.state.language} />
        <Footer language={this.state.language} />
      </div>
    );
  }
}

export default App;
