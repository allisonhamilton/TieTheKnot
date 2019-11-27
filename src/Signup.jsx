import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./signup.css";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  signupUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  signupPasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  onSubmitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("This username is taken, try another");
      return;
    }
    {
      alert("You have successfully signed up!");
      this.setState({ username: "", password: "" });
      this.props.dispatch({
        type: "login-success",
        login: true,
        userLoggedIn: this.state.username
      });
      return;
    }
  };
  render = () => {
    return (
      <div className="signup-container">
        <form onSubmit={this.onSubmitHandler}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.signupUsernameChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Password"
              value={this.state.password}
              onChange={this.signupPasswordChange}
            />
          </div>
          <div>
            <input type="submit" value="Sign me up!" />
          </div>
        </form>
        <div>
          <Link to="/login">Already have an account? Click here to login!</Link>
        </div>
      </div>
    );
  };
}

let Signup = connect()(UnconnectedSignup);

export default Signup;
