import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./profile.css";

class UnconnectedProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      image: undefined,
      date: undefined
    };
  }
  usernameOnChange = event => {
    this.setState({ username: event.target.value });
  };
  editProfileSubmit = async () => {
    let data = new FormData();

    data.append("username", this.state.username);
    data.append("email", this.props.loggedIn);
    data.append("password", this.state.password);
    data.append("date", this.state.date);
    data.append("image", this.state.image);
    let response = await fetch("/editUser", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("Your information wasn't saved, try again to update your profile");
    }
    {
      this.props.dispatch({ type: "edit-profile", toggleEditProfile: false });
    }
  };
  editProfileClick = () => {
    this.props.dispatch({ type: "edit-profile", toggleEditProfile: true });
  };

  imageOnChange = event => {
    this.setState({ image: event.target.files[0] });
  };
  passwordOnChange = event => {
    this.setState({ password: event.target.value });
  };
  dateOnChange = event => {
    this.setState({ date: event.target.value });
  };
  loggedOut = () => {
    if (this.props.loggedIn === "") {
      return (
        <div>
          <span>You must be signed in to access your profile page.</span>
          <Link to="/login">Sign in here.</Link>
        </div>
      );
    }
  };
  render = () => {
    console.log("RENDER PROFILE", this.props.user);
    if (!this.props.toggleEditProfile) {
      return (
        <div className="profile-container">
          <div>
            <img src={this.props.user.image} className="profile-img" />
          </div>
          <h3> {this.props.user.username}</h3>
          <div> {this.props.user.who}</div>
          <div>{this.props.user.country}</div>

          <button onClick={this.editProfileClick} className="profile-button">Edit</button>
        </div>
      );
    }
    if (this.props.toggleEditProfile) {
      return (
        <div className="profile-container">
          <div>
            <img className="profile-img" src={this.props.user.image} />
          </div>
          <form onSubmit={this.editProfileSubmit}>
            <div>
              {this.props.user.username} Change your username:
              <div>
                <input
                  type="text"
                  placeholder="New Username"
                  value={this.state.username}
                  onChange={this.usernameOnChange}
                  className="input-profile"
                />
              </div>
            </div>
            <div>
              Change your password:
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={this.state.password}
                  onChange={this.passwordOnChange}
                  className="input-profile"
                />
              </div>
            </div>
            <div>
              Change your profile photo
              <div>
                <input
                  type="file"
                  onChange={this.imageOnChange}
                  className="input-profile"
                />
              </div>
              <div>
                Add a wedding date if you haven't already:
                <input
                  type="date"
                  onChange={this.dateOnChange}
                  className="input-profile"
                />
              </div>
            </div>

            <div>
              <input className="profile-button" type="submit" value="Update" />
            </div>
          </form>
        </div>
      );
    }
  };
}

let mapStateToProps = state => {
  return {
    login: state.login,
    loggedIn: state.loggedIn,
    users: state.users,
    toggleEditProfile: state.toggleEditProfile
  };
};

let Profile = connect(mapStateToProps)(UnconnectedProfile);

export default Profile;
