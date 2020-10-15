import dotenv from "dotenv";
import React, { useState } from "react";
import Header from "./../components/Header";
import Options from "./../components/Options";
import Footer from "./../components/Footer";
import "./styles.css";
import "./spectre.min.css";
import "./spectre-icons.min.css";

dotenv.config();

let language = localStorage.getItem("language");

if (!language) {
  localStorage.setItem("language", "en");
  language = "en";
}

function App() {
  const [myLang, setMyLang] = useState(language);

  const saveLanguage = (lng) => {
    localStorage.setItem("language", lng);
    setMyLang(lng);
  };

  return (
    <div className="App" data-testid="app">
      <Header language={myLang} changeLanguage={(lng) => saveLanguage(lng)} />
      <Options language={myLang} />
      <Footer language={myLang} />
    </div>
  );
}

export default App;
