import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./signup.css";

const countries = new Array("", "Canada", "United Kingdom", "USA", "other");

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      country: countries[0],
      email: "",
      weddingDate: undefined,
      who: "",
      redirect: false
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
  dateOnChange = event => {
    this.setState({ weddingDate: event.target.value });
  };
  whoOnChange = event => {
    this.setState({ who: event.target.value });
  };
  onSubmitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("country", this.state.country);
    data.append("email", this.state.email);
    data.append("date", this.state.weddingDate);
    data.append("who", this.state.who);
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });

    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      this.setState({
        username: "",
        password: "",
        country: "",
        email: "",
        weddingDate: undefined,
        who: ""
      });
      alert("This username is taken, try another");
      return;
    }
    {
      alert("You have successfully signed up!");
      this.setState({
        redirect: true
      });
      this.props.dispatch({
        type: "login-success",
        login: true,
        loggedIn: this.state.username
      });
      return;
    }
  };
  render = () => {
    if (this.state.redirect) return <Redirect to="/" />;
    return (
      <div className="container-signup">
        <div className="form-signup">
          <img src="/uploads/signup-pic.jpg" className="signup-pic" />
          <form className="signup" onSubmit={this.onSubmitHandler}>
            <div className="signup-child">
              My name is...
              <input
                type="text"
                placeholder="First name..."
                value={this.state.username}
                onChange={this.signupUsernameChange}
              />
            </div>
            <div className="signup-child">
              My password is...
              <input
                type="password"
                placeholder="Password..."
                value={this.state.password}
                onChange={this.signupPasswordChange}
              />
            </div>
            <div className="signup-child">
              My email is...
              <input
                placeholder="Email..."
                type="email"
                name="Mail"
                id="email"
                pattern=".+@+.+.com"
                onChange={this.emailOnChange}
              />
            </div>
            <div className="signup-child">
              I am from...
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
            <div className="signup-child">
              The wedding date is...
              <input type="date" onChange={this.dateOnChange} />
            </div>
            <div className="signup-child">
              I am ...
              <select
                name="others"
                id="other-options"
                onChange={this.whoOnChange}
              >
                <option value="">--Please choose who you are--</option>
                <option value="bride">I am the bride</option>
                <option value="grrom">I am the groom</option>
                <option value="relative">I am a relative</option>
                <option value="professional">I am a professional</option>
                <option value="guest">I am a guest</option>
                <option value="other">I am someone other ....</option>
              </select>
            </div>
            <div>
              <input
                className="signup-button"
                type="submit"
                value="Sign me up"
              />
            </div>
            <div className="link">
              Already have an account?
              <Link to="/login"> Log in</Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

let Signup = connect()(UnconnectedSignup);

export default Signup;
