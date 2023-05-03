import React, { Component } from "react";
import "./search.css";
import search_logo from "../media/icon-search.png";

const fetchUserAndOrHashtag = (input = "") => {
  let user = null;
  let hashtag = null;
  let usrIdx = input.indexOf("@");
  let tagIdx = input.indexOf("#");
  if (usrIdx >= 0) {
    let spaceIdx = input.indexOf(" ", usrIdx);
    user = input.substring(
      usrIdx + 1,
      spaceIdx === -1 ? input.length + 1 : spaceIdx
    );
  }
  if (tagIdx >= 0) {
    let spaceIdx = input.indexOf(" ", tagIdx);
    hashtag = input.substring(
      tagIdx + 1,
      spaceIdx === -1 ? input.length + 1 : spaceIdx
    );
  }
  return { user, hashtag };
};

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
    const { user, hashtag } = fetchUserAndOrHashtag(this.state.searchTerm);
    this.props.onSearch({ user, hashtag });
  }

  render() {
    return (
      <div className="search-component">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter @xyz for Profiles and #xyz for Hashtags searches, default result displayed is of user @therock "
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
