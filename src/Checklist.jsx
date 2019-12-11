import React, { Component } from "react";
import { connect } from "react-redux";
import "./checklist.css";
import { Link } from "react-router-dom";

class UnconnectedChecklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      dueDate: "",
      done: false
    };
  }
  addItemChange = event => {
    this.setState({ input: event.target.value });
  };
  dueDateChange = event => {
    this.setState({ dueDate: event.target.value });
  };
  addTaskSubmit = async event => {
    event.preventDefault();
    console.log("ADD A NEW TASK");
    let data = new FormData();
    data.append("email", this.props.loggedIn);
    data.append("task", this.state.input);
    data.append("dueDate", this.state.dueDate);
    data.append("done", this.state.done);
    console.log("data", data);
    let response = await fetch("newTask", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    console.log("response", response);
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("body", body);
    if (!body.success) {
      alert("You're task has not been added, can you please try again?");
      return;
    }
    {
      alert("You have successfully added a new task!");
      this.setState({
        input: "",
        dueDate: "",
        task: {}
      });
      this.props.dispatch({
        type: "add-task"
      });
    }
  };
  render = () => {
    if (this.props.loggedIn === "") {
      return (
        <div>
          <span>You must be signed in to access your profile page.</span>
          <Link to="/login">Sign in here.</Link>
        </div>
      );
    }
    if (this.props.login) {
      return (
        <div>
          <form onSubmit={this.addTaskSubmit}>
            <input
              name="title"
              type="text"
              placeholder="Add a new task..."
              value={this.state.input}
              onChange={this.addItemChange}
            />
            <select name="dueDate" onChange={this.dueDateChange}>
              <option value="">--When should this task be done-</option>
              <option value="8 to 12 months before">
                8 to 12 months before
              </option>
              <option value="4 to 8 months before">4 to 8 months before</option>
              <option value="1 to 4 months before">1 to 4 months before</option>
              <option value="1 months left">1 months before</option>
            </select>
            <input type="submit" value="Add to checklist" />
          </form>

          <div>
            <ul>
              {this.props.allTasks.map(task => {
                return <li>{task}</li>;
              })}
            </ul>
          </div>
        </div>
      );
    }
  };
}

let mapStateToProps = state => {
  return {
    login: state.login,
    loggedIn: state.loggedIn,
    allTasks: state.allTasks,
    users: state.users
  };
};

let Checklist = connect(mapStateToProps)(UnconnectedChecklist);

export default Checklist;
