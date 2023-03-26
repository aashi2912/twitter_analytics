import React, { Component } from "react";
import "./search.css";
import search_logo from "../media/icon-search.png";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.searchTerm);
  }

  render() {
    return (
      <div className="search-component">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter @xyz for Profiles and #xyz for Hashtags searches"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <img src={search_logo} alt="Submit icon" className="submit-icon" />
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
