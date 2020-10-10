import dotenv from "dotenv";
import React from "react";
import Header from "./../components/Header";
import Options from "./../components/Options";
import Results from "./../components/Results";
import Footer from "./../components/Footer";
import "./styles.css";
import "./bootstrap.css";
import "./spectre.min.css";
import "./spectre-icons.min.css";

dotenv.config();

function App() {
  return (
    <div className="App">
      <Header />
      <Options />
      <Footer />
    </div>
  );
}

export default App;
