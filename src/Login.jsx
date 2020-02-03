import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./login.css";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: "",
      loginPwd: "",
      redirect: false
    };
  }
  usernameChange = event => {
    this.setState({ loginEmail: event.target.value });
  };
  passwordChange = event => {
    this.setState({ loginPwd: event.target.value });
  };
  loginSubmitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("email", this.state.loginEmail);
    data.append("password", this.state.loginPwd);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      this.setState({ loginEmail: "", loginPwd: "" });
      alert("Failed login, try again or sign up");
      return;
    }
    {
      this.props.dispatch({
        type: "login-success",
        loggedIn: this.state.loginEmail,
        login: true
      });
      this.setState({ redirect: true });
      alert("login successful");
      return;
    }
  };
  render = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-box">
        <img src="/uploads/login-pic.jpg" className="login-pic" />
        <form onSubmit={this.loginSubmitHandler} className="login-container">
          <div>
            <input
              type="email"
              value={this.state.loginEmail}
              placeholder="Email..."
              onChange={this.usernameChange}
              className="input-box"
            />
          </div>
          <div>
            <input
              type="password"
              value={this.state.loginPwd}
              placeholder="Password..."
              onChange={this.passwordChange}
              className="input-box"
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
