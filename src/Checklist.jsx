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
  componentDidMount = () => {
    let updateTasks = async () => {
      let response = await fetch("/checklistTwelve");
      let responseBody = await response.text();
      let body = JSON.parse(responseBody);
      let userTasks = this.props.users.filter(user => {
        return user.email === this.props.loggedIn;
      });

      let bodyTasks = body.tasks.filter(user => {
        return user.userId === userTasks[0]._id;
      });
      if (body.success) {
        this.props.dispatch({ type: "set-tasks-twelve", tasks: bodyTasks });
      }
      let newResponse = await fetch("/checklistEight");
      let newResponseBody = await newResponse.text();
      let newBody = JSON.parse(newResponseBody);
      let newUserTasks = this.props.users.filter(user => {
        return user.email === this.props.loggedIn;
      });
      let newBodyTasks = newBody.tasks.filter(user => {
        return user.userId === newUserTasks[0]._id;
      });
      if (newBody.success) {
        this.props.dispatch({ type: "set-tasks-eight", tasks: newBodyTasks });
      }
      let fourResponse = await fetch("/checklistFour");
      let fourResponseBody = await fourResponse.text();
      let fourBody = JSON.parse(fourResponseBody);
      let fourUserTasks = this.props.users.filter(user => {
        return user.email === this.props.loggedIn;
      });
      let fourBodyTasks = fourBody.tasks.filter(user => {
        return user.userId === fourUserTasks[0]._id;
      });
      if (fourBody.success) {
        this.props.dispatch({ type: "set-tasks-four", tasks: fourBodyTasks });
      }
      let oneResponse = await fetch("/checklistOneMonth");
      let oneResponseBody = await oneResponse.text();
      let oneBody = JSON.parse(oneResponseBody);
      let oneUserTasks = this.props.users.filter(user => {
        return user.email === this.props.loggedIn;
      });
      let oneBodyTasks = oneBody.tasks.filter(user => {
        return user.userId === oneUserTasks[0]._id;
      });
      if (oneBody.success) {
        this.props.dispatch({ type: "set-tasks-one", tasks: oneBodyTasks });
      }
    };
    let myInterval = setInterval(updateTasks, 300);
  };
  addItemChange = event => {
    this.setState({ input: event.target.value });
  };
  dueDateChange = event => {
    this.setState({ dueDate: event.target.value });
  };
  addTaskSubmit = async event => {
    event.preventDefault();

    let data = new FormData();
    data.append("email", this.props.loggedIn);
    data.append("task", this.state.input);
    data.append("dueDate", this.state.dueDate);
    data.append("done", this.state.done);

    let response = await fetch("newTask", {
      method: "POST",
      body: data,
      credentials: "include"
    });

    let responseBody = await response.text();
    let body = JSON.parse(responseBody);

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

  removeTaskTwelve = async index => {
    console.log("Is delete working??", index);
    let task = this.props.listTwelve.filter((ele, i) => {
      console.log("why??????", ele, i);
      return i === index;
    });
    console.log("DELETEDDD", task);
    let data = new FormData();
    data.append("task", task[0].title);
    let response = await fetch("/deleteInTwelve", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("Your task hasn't been deleted, please try again!");
    }
    alert("This task has been deleted from your checklist!");
  };
  removeTaskEight = async index => {
    let deleted = this.props.listEight.filter((ele, i) => {
      return i !== index;
    });
    this.props.dispatch({ type: "deleteTaskEight", deleted: deleted });
  };
  removeTaskFour = async index => {
    let deleted = this.props.listFour.filter((ele, i) => {
      return i !== index;
    });
    this.props.dispatch({ type: "deleteTaskFour", deleted: deleted });
  };
  removeTaskOne = async index => {
    let deleted = this.props.listOne.filter((ele, i) => {
      return i !== index;
    });
    this.props.dispatch({ type: "deleteTaskOne", deleted: deleted });
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
            <h4>What you should do from 8 months to 12 months ahead</h4>
            <ul>
              {this.props.listTwelve.map((tasks, index) => {
                return (
                  <li>
                    <Link
                      className="link-twelveList"
                      to={"/checklist/description/" + tasks._id}
                    >
                      {tasks.title}
                    </Link>
                    <form
                      onSubmit={t => {
                        t.preventDefault();
                        this.removeTaskTwelve(index);
                      }}
                      className="bin-icon"
                    >
                      <input
                        type="image"
                        src="/uploads/garbagebin.png"
                        alt="submit"
                        height="20px"
                      />
                    </form>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4>What you should do from 4 to 8 months ahead</h4>
            <ul>
              {this.props.listEight.map((tasks, index) => {
                return (
                  <li>
                    {" "}
                    <Link
                      className="link-eightList"
                      to={"/checklist/description/" + tasks._id}
                    >
                      {tasks.title}
                    </Link>
                    <form
                      onSubmit={t => {
                        t.preventDefault();
                        this.removeTaskEight(index);
                      }}
                      className="bin-icon"
                    >
                      <input
                        type="image"
                        src="/uploads/garbagebin.png"
                        alt="submit"
                        height="20px"
                      />
                    </form>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4>What you should do 1 to 4 months before</h4>
            <ul>
              {this.props.listFour.map((tasks, index) => {
                return (
                  <li>
                    <Link
                      className="link-eightList"
                      to={"/checklist/description/" + tasks._id}
                    >
                      {tasks.title}
                    </Link>
                    <form
                      onClick={t => {
                        t.preventDefault();
                        this.removeTaskFour(index);
                      }}
                      className="bin-icon"
                    >
                      <input
                        type="image"
                        alt="submit"
                        src="/uploads/garbagebin.png"
                        height="20px"
                      />
                    </form>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4>What you should be doing within 1 month of your wedding</h4>
            <ul>
              {this.props.listOne.map((tasks, index) => {
                return (
                  <li>
                    {" "}
                    <Link
                      className="link-eightList"
                      to={"/checklist/description/" + tasks._id}
                    >
                      {tasks.title}
                    </Link>
                    <form
                      onClick={t => {
                        t.preventDefault();
                        this.removeTaskOne(index);
                      }}
                      className="bin-icon"
                    >
                      <input
                        type="image"
                        alt="submit"
                        src="/uploads/garbagebin.png"
                        height="20px"
                      />
                    </form>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  };
}

let mapStateToProps = state => {
  console.log("checlist state", state.listOne);
  return {
    login: state.login,
    loggedIn: state.loggedIn,
    users: state.users,
    listTwelve: state.listTwelve,
    listEight: state.listEight,
    listFour: state.listFour,
    listOne: state.listOne
  };
};

let Checklist = connect(mapStateToProps)(UnconnectedChecklist);

export default Checklist;
