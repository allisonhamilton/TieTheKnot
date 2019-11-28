import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: "",
      loginPwd: ""
    };
  }
  usernameChange = event => {
    this.setState({ loginUser: event.target.value });
  };
  passwordChange = event => {
    this.setState({ loginPwd: event.target.value });
  };
  loginSubmitHandler = async event => {
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
      alert("Failed login, try again or sign up");
      return;
    }
    {
      this.setState({ loginUser: "", loginPwd: "" });
      this.props.dispatch({
        type: "login-success",
        usernameLogin: this.state.loginUser
      });
      alert("login successful");
    }
  };
  render = () => {
    return (
      <div>
        <form onSubmit={this.loginSubmitHandler}>
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
              type="text"
              value={this.state.loginPwd}
              placeholder="Password..."
              onChange={this.passwordChange}
            />
          </div>
          <input type="submit" />
          <div>
            <Link to="/signup">Don't have an account yet, sign up here!</Link>
          </div>
        </form>
      </div>
    );
  };
}

let Login = connect()(UnconnectedLogin);

export default Login;
