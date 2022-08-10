import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createTask,
  fetchProjects,
  updateTask,
  filterTasks,
  setCurrentProjectId,
} from "./actions";
import TasksPage from "./components/TasksPage";
import FlashMessage from "./components/FlashMessage";
import { getGroupedAndFilteredTasks, getProjects } from "./reducers";
import Header from "./components/Header";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProjects());
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

  onCurrentProjectChange = (e) => {
    this.props.dispatch(setCurrentProjectId(Number(e.target.value)));
  };

  render() {
    return (
      <div className="main-content">
        {this.props.error ? (
          <FlashMessage message={this.props.error} />
        ) : (
          <>
            <Header
              projects={this.props.projects}
              onCurrentProjectChange={this.onCurrentProjectChange}
            />
            <TasksPage
              tasks={this.props.tasks}
              groupedTasks={this.props.groupedTasks}
              onCreateTask={this.onCreateTask}
              onUpdateTask={this.onUpdateTask}
              onSearch={this.onSearch}
              isLoading={this.props.isLoading}
            />
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoading, error } = state.projects;

  return {
    tasks: getGroupedAndFilteredTasks(state),
    projects: getProjects(state),
    isLoading,
    error,
  };
}

export default connect(mapStateToProps)(App);
