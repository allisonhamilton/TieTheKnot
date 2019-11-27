import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  render = () => {
    return <div>"Log me in!"</div>;
  };
}

let Login = connect()(UnconnectedLogin);

export default Login;
