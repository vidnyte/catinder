import React from "react";
import LocalizedStrings from "react-localization";
import "./styles.css";
import langFile from "./../../lang.json";

const lang = new LocalizedStrings(langFile);

function Loading() {
  return <div className="loading loading-lg loading-wrapper">LOADING...</div>;
}

export default Loading;
