import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./profile.css";

class UnconnectedProfile extends Component {
  render = () => {
    if (this.props.loggedIn === "") {
      return (
        <div>
          <span>You must be signed in to access your profile page.</span>
          <Link to="/login">Sign in here.</Link>
        </div>
      );
    }
    {
      return <div>Hello, {this.props.loggedIn}</div>;
    }
  };
}

let mapStateToProps = state => {
  return {
    login: state.login,
    loggedIn: state.loggedIn,
    users: state.users
  };
};

let Profile = connect(mapStateToProps)(UnconnectedProfile);

export default Profile;
