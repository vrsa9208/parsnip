import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask, fetchTasks, updateTask } from "./actions";
import TasksPage from "./components/TasksPage";
import FlashMessage from "./components/FlashMessage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }

  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };

  onUpdateTask = (task) => {
    this.props.dispatch(updateTask(task));
  };

  render() {
    return (
      <div className="main-content">
        {this.props.error ? (
          <FlashMessage message={this.props.error} />
        ) : (
          <TasksPage
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onUpdateTask={this.onUpdateTask}
            isLoading={this.props.isLoading}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.tasks,
    isLoading: state.tasks.isLoading,
    error: state.tasks.error,
  };
}

export default connect(mapStateToProps)(App);
