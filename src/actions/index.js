import * as api from "../api";

export function fetchTasks() {
  return (dispatch) => {
    dispatch(fetchTasksStarted());

    api
      .fetchTasks()
      .then((response) => {
        setTimeout(() => {
          dispatch(fetchTasksSucceeded(response.data));
        }, 2000);
        // throw new Error("Unable to fetch tasks");
      })
      .catch((error) => {
        dispatch(fetchTasksFailed(error.message));
      });
  };
}

export function fetchTasksStarted() {
  return {
    type: "FETCH_TASKS_STARTED",
  };
}

export function fetchTasksSucceeded(tasks) {
  return {
    type: "FETCH_TASKS_SUCCEEDED",
    payload: {
      tasks,
    },
  };
}

export function fetchTasksFailed(error) {
  return {
    type: "FETCH_TASKS_FAILED",
    payload: {
      error,
    },
  };
}

export function createTask({ title, description, status = "Unstarted" }) {
  return (dispatch) => {
    api.createTasks({ title, description, status }).then((response) => {
      dispatch(createTaskSucceeded(response.data));
    });
  };
}

export function createTaskSucceeded(task) {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}

export function updateTask({ id, ...task }) {
  return (dispatch) => {
    api.updateTask(id, task).then((response) => {
      dispatch(updateTaskSucceeded(response.data));
    });
  };
}

export function updateTaskSucceeded(task) {
  return {
    type: "UPDATE_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}
