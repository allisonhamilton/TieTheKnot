import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./signup.css";

const countries = new Array("", "Canada", "United Kingdom", "USA");

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      country: countries[0],
      email: ""
    };
  }
  signupUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  signupPasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  countryOnChange = event => {
    this.setState({ country: event.target.value });
  };
  emailOnChange = event => {
    this.setState({ email: event.target.value });
  };
  onSubmitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("country", this.state.country);
    data.append("email", this.state.email);
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
              placeholder="First name..."
              value={this.state.username}
              onChange={this.signupUsernameChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Password..."
              value={this.state.password}
              onChange={this.signupPasswordChange}
            />
          </div>
          <div>
            <input
              placeholder="Email..."
              type="email"
              name="Mail"
              onChange={this.emailOnChange}
            />
          </div>
          <div>
            <select
              value={this.state.country}
              id="country"
              name="country"
              onChange={this.countryOnChange}
            >
              <option value="">--Please choose a country--</option>
              {countries.map(country => {
                return <option value={country}>{country}</option>;
              })}
            </select>
          </div>
          <div>
            <input type="submit" value="Sign up" />
          </div>
        </form>
        <div>
          Already have an account?
          <Link to="/login">Log in</Link>
        </div>
      </div>
    );
  };
}

let Signup = connect()(UnconnectedSignup);

export default Signup;
