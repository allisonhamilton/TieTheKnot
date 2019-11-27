import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
  render = () => {
      return (<div>"Sign me up"</div>) 
  };
}

let Signup = connect()(UnconnectedSignup);

export default Signup;
