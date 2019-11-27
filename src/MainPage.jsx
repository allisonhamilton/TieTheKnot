import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UnconnectedMainPage extends Component {
  render() {
    return (
      <div>
        <Link to="/signup">Sign me up</Link>
        <div>
          <Link to="/login">Log me in</Link>
        </div>
      </div>
    );
  }
}

let MainPage = connect()(UnconnectedMainPage);

export default MainPage;
