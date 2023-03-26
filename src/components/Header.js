import React, { Component } from "react";
import logo from "../media/twitter-logo.png";
import "./header.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Twitter Analytics</h1>
      </div>
    );
  }
}

export default Header;
