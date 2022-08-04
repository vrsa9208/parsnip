import * as api from "../api";

export function fetchTasks() {
  return {
    type: "FETCH_TASKS_STARTED",
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
    meta: {
      analytics: {
        event: "create_task",
        data: {
          ...task,
        },
      },
    },
  };
}

function progressTimerStart(taskId) {
  return { type: "TIMER_STARTED", payload: { taskId } };
}

function progressTimerStop(taskId) {
  return { type: "TIMER_STOPPED", payload: { taskId } };
}

export function updateTask({ id, ...task }) {
  return (dispatch) => {
    api.updateTask(id, task).then((response) => {
      dispatch(updateTaskSucceeded(response.data));
      if (response.data.status === "In Progress") {
        dispatch(progressTimerStart(response.data.id));
      } else {
        dispatch(progressTimerStop(response.data.id));
      }
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
