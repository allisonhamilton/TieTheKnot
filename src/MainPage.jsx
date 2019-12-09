import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";

class UnconnectedMainPage extends Component {
  user = this.props.users.map(user => {
    return <li>{user.username}</li>;
  });
  render() {
    return (
      <div>
        <div>Your personal wedding planner</div>
        <div>
          <ul>{this.user}</ul>
        </div>
        <div className="container-icon">
          <Link className="checklist-link" to="/checklist">
            <div className="mainpage-icon">
              Create a checklist for your wedding
            </div>
            <div>
              <img src="/uploads/clipboard.png" height="75px" />
            </div>
          </Link>
          <Link className="checklist-link">
            <div className="mainpage-icon">
              Join our community of wedding planners, brides and grooms
            </div>
            <div>
              <img src="/uploads/community.png" height="80px" />
            </div>
          </Link>
          <Link className="checklist-link">
            <div>Create a wedding budget</div>
            <div>
              <img src="/uploads/calculator.png" height="75px" />
            </div>
          </Link>
          <Link className="checklist-link">
            <div>Need some wedding ideas</div>
            <div>
              <img src="/uploads/idea.png" height="75px" />
            </div>
          </Link>
          <Link className="checklist-link">
            <div>Fashion ideas for the big day</div>
            <div>
              <img src="/uploads/dress.jpg" height="75px" />
            </div>
          </Link>
        </div>

        <div className="mainpage-carousel-conatiner">
          <div>
            <img
              src="/uploads/mainpage-photo1.jpg"
              height="600px"
              max-width="1000px"
            />
          </div>
          <div>
            <img
              src="/uploads/mainpage-photo2.jpg"
              height="600px"
              max-width="1000px"
            />
          </div>
          <div>
            <img
              src="/uploads/mainpage-photo3.jpg"
              height="600px"
              max-width="1000px"
            />
          </div>
          <div>
            <img
              src="/uploads/mainpage-photo4.jpg"
              height="600px"
              max-width="1000px"
            />
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    users: state.users
  };
};

let MainPage = connect(mapStateToProps)(UnconnectedMainPage);

export default MainPage;
