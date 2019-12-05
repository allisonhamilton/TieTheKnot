import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./login.css";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: "",
      loginPwd: "",
      redirect: false
    };
  }
  usernameChange = event => {
    this.setState({ loginUser: event.target.value });
  };
  passwordChange = event => {
    this.setState({ loginPwd: event.target.value });
  };
  loginSubmitHandler = async event => {
    console.log("login submit handler", this.state.loginUser);
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.loginUser);
    data.append("password", this.state.loginPwd);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    console.log("response login", response);
    let responseBody = await response.text();
    console.log("responseBody", responseBody);
    let body = JSON.parse(responseBody);
    console.log("body login", body);
    if (!body.success) {
      this.setState({ loginUser: "", loginPwd: "" });
      alert("Failed login, try again or sign up");
      return;
    }
    {
      this.props.dispatch({
        type: "login-success",
        loggedIn: this.state.loginUser
      });
      this.setState({ redirect: true });
      alert("login successful");
      return;
    }
  };
  render = () => {
    if (this.state.redirect) return <Redirect to="/" />;
    return (
      <div className="login-box">
        <img src="/uploads/login-pic.jpg" className="login-pic" />
        <form onSubmit={this.loginSubmitHandler} className="login-container">
          <div>
            <input
              type="text"
              value={this.state.loginUser}
              placeholder="Username..."
              onChange={this.usernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              value={this.state.loginPwd}
              placeholder="Password..."
              onChange={this.passwordChange}
            />
          </div>
          <input type="submit" className="login-button" />
          <div>
            <Link to="/signup" className="login-link">
              Don't have an account yet, sign up here!
            </Link>
          </div>
        </form>
      </div>
    );
  };
}

let Login = connect()(UnconnectedLogin);

export default Login;
