import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask, fetchTasks, updateTask, filterTasks } from "./actions";
import TasksPage from "./components/TasksPage";
import FlashMessage from "./components/FlashMessage";
import { getFilteredTasks, getGroupedTasks } from "./reducers";

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

  onSearch = (searchTerm) => {
    this.props.dispatch(filterTasks(searchTerm));
  };

  render() {
    return (
      <div className="main-content">
        {this.props.error ? (
          <FlashMessage message={this.props.error} />
        ) : (
          <TasksPage
            tasks={this.props.tasks}
            groupedTasks={this.props.groupedTasks}
            onCreateTask={this.onCreateTask}
            onUpdateTask={this.onUpdateTask}
            onSearch={this.onSearch}
            isLoading={this.props.isLoading}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoading, error } = state.tasks;

  return {
    tasks: getFilteredTasks(state),
    groupedTasks: getGroupedTasks(state),
    isLoading,
    error,
  };
}

export default connect(mapStateToProps)(App);
