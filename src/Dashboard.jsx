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
    let userLogin = this.props.users.filter((user, i) => {
      console.log(">>>>>>>>>>>>>>>", user, this.props.loggedIn);
      return user.email === this.props.loggedIn;
    });
    console.log("USER WORKKKKK:::::::::", userLogin, this.props.users);

    if (userLogin.length === 0) {
      return;
    }
    return (
      <div className="dashboard-right">
        <Link to={"/profile/" + userLogin[0]._id} className="dashboard-link">
          My profile
        </Link>
        <div>
          <button className="dashboard-btn-logout" onClick={this.logoutHandler}>
            Log out
          </button>
        </div>
      </div>
    );
  };
  logoutHandler = async () => {
    // let response = await fetch("/logout", {
    //   method: "POST",
    //   body: "",
    //   credentials: "include"
    // });
    // console.log("LOGOUTTTT response", response);
    // let responseBody = await response.text();
    // console.log("LOGOUTTTT responseBody", responseBody);
    // let body = JSON.parse(responseBody);
    // console.log("LOGOUTTTT body", body);
    // if (!body.success) {
    //   alert("Try logging out again");
    //   return;
    // }
    this.props.dispatch({
      type: "logout-success",
      loggedIn: "",
      login: false
    });
    this.ifNotLoggedIn();
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
  return {
    login: state.login,
    users: state.users,
    loggedIn: state.loggedIn
  };
};

let Dashboard = connect(mapStateToProps)(UnconnectedDashboard);

export default Dashboard;
