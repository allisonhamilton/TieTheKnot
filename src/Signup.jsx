import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./signup.css";

const countries = new Array(
  "",
  "Canada",
  "United Kingdom",
  "USA",
  "France",
  "Other"
);

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      country: countries[0],
      email: "",
      weddingDate: undefined,
      image: undefined,
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
    console.log("event.target.value who????????", event.target.value);
    if (event.target.value === "Bride" || event.target.value === "Groom") {
      this.setState({
        who: event.target.value,
        image: "/uploads/bride-groom.png"
      });
    }
    if (event.target.value === "Relative" || event.target.value === "Guest") {
      this.setState({
        who: event.target.value,
        image: "/uploads/guest.png"
      });
    }
    if (
      event.target.value === "Professional" ||
      event.target.value === "Other"
    ) {
      this.setState({
        who: event.target.value,
        image: "/uploads/wedding-planner.png"
      });
    }
  };
  onSubmitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    console.log("STATE IMAGEEEEZZZZZZZZ", this.state.image);
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("country", this.state.country);
    data.append("email", this.state.email);
    data.append("date", this.state.weddingDate);
    data.append("who", this.state.who);
    data.append("image", this.state.image);
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
        who: "",
        image: undefined
      });
      alert("This username is taken, try another");
      return;
    }
    if (body.success) {
      console.log("????>>>>>>WHYYYYYYYYYYAHHH");
      let newData = new FormData();
      newData.append("email", this.state.email);
      let taskResponse = await fetch("/autoChecklist", {
        method: "POST",
        body: newData,
        credentials: "include"
      });
      console.log("taskResponse", taskResponse);
      let taskResponseBody = await taskResponse.text();
      console.log("taskResponseBody", taskResponseBody);
      let taskBody = JSON.parse(taskResponseBody);
      console.log("******taskBody", taskBody);
      if (taskBody.success) {
        alert("You have successfully signed up!");
        this.setState({
          redirect: true
        });
        this.props.dispatch({
          type: "login-success",
          login: true,
          loggedIn: this.state.email
        });
        return;
      }
    }
  };

  render = () => {
    console.log("redirect state", this.state.redirect);
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
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
                className="signup-input-box"
              />
            </div>
            <div className="signup-child">
              My password is...
              <input
                type="password"
                placeholder="Password..."
                value={this.state.password}
                onChange={this.signupPasswordChange}
                className="signup-input-box"
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
                className="signup-input-box"
              />
            </div>
            <div className="signup-child">
              I am from...
              <select
                value={this.state.country}
                id="country"
                name="country"
                onChange={this.countryOnChange}
                className="signup-input-box"
              >
                <option value="">--Please choose a country--</option>
                {countries.map(country => {
                  return <option value={country}>{country}</option>;
                })}
              </select>
            </div>
            <div className="signup-child">
              The wedding date is...
              <input
                type="date"
                onChange={this.dateOnChange}
                className="signup-input-box"
              />
            </div>
            <div className="signup-child">
              I am ...
              <select
                name="others"
                id="other-options"
                onChange={this.whoOnChange}
                className="signup-input-box"
              >
                <option value="">--Please choose who you are--</option>
                <option value="Bride">I am the bride</option>
                <option value="Groom">I am the groom</option>
                <option value="Relative">I am a relative</option>
                <option value="Professional">I am a professional</option>
                <option value="Guest">I am a guest</option>
                <option value="Other">I am someone other ....</option>
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
