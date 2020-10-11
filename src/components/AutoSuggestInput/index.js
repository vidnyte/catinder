import React from "react";
import Autosuggest from "react-autosuggest";

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

class AutoSuggestInput extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],
    };

    this.getSuggestions = this.getSuggestions.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
  }

  renderSuggestion(suggestion) {
    return (
      <span onClick={() => this.props.onSuggestionClick(suggestion.name)}>
        {suggestion.name}
      </span>
    );
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  getSuggestions(value) {
    console.log("getSuggestions value: ", value);
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");

    return this.props.breeds.filter((breed) => regex.test(breed.name));
  }

  onChange(event, { newValue, method }) {
    this.setState({
      value: newValue,
    });
    this.props.myOnChange(event);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange,
      ...this.props.myInput,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AutoSuggestInput;
