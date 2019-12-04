import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedProfile extends Component {
  render = () => {
    return <div>This is your profile page</div>;
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
