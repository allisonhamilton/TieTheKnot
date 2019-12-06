import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./dashboard.css";

class UnconnectedDashboard extends Component {
  ifNotLoggedIn = () => {
    return (
      <div className="dashboard-right">
        <Link to="/login" className="dashboard-link">
          <span>Log in</span>
        </Link>
        <Link to="/signup" className="dashboard-link">
          <span>Sign up</span>
        </Link>
      </div>
    );
  };
  ifLoggedIn = () => {
    let user = this.props.users.find(user => {
      return user.email === this.props.loggedIn;
    });

    return (
      <div className="dashboard-right">
        <Link to={"/profile/" + user._id} className="dashboard-link">
          My profile
        </Link>
        <div onClick={this.ifLoggedOut}>
          <Link to="/" className="dashboard-link">
            Log out
          </Link>
        </div>
      </div>
    );
  };
  logoutHandler = () => {
    fetch("/logout", { method: "POST", body: "", credentials: "include" });
    this.props.dispatch({ type: "logout-success", loggedIn: "" });
    alert("You have successfully logged out");
  };

  render = () => {
    return (
      <div className="container-dashboard">
        <div>
          <Link to="/" className="logo-icon">
            <img src="/uploads/logo-good.png" className="logo-image" />
            <span className="name">TieTheKnot</span>
          </Link>
        </div>
        <section>
          {this.props.login ? this.ifLoggedIn() : this.ifNotLoggedIn()}
        </section>
      </div>
    );
  };
}

let mapStateToProps = state => {
  console.log("STATE FOR DASHBOARD", state);
  return {
    login: state.login,
    users: state.users,
    loggedIn: state.loggedIn
  };
};

let Dashboard = connect(mapStateToProps)(UnconnectedDashboard);

export default Dashboard;
