import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";

class UnconnectedMainPage extends Component {
  render() {
    return <div>This is the homepage woo</div>;
  }
}

let MainPage = connect()(UnconnectedMainPage);

export default MainPage;
