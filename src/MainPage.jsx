import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";

class UnconnectedMainPage extends Component {
  user = this.props.users.map(user => {
    return <li>{user.username}</li>;
  });
  render() {
    return (
      <div>
        <div>This is the homepage woo</div>
        <div>
          <ul>{this.user}</ul>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    users: state.users
  };
};

let MainPage = connect(mapStateToProps)(UnconnectedMainPage);

export default MainPage;
