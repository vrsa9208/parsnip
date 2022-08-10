import * as api from "../api";
import { schema, normalize } from "normalizr";

const taskSchema = new schema.Entity("tasks");
const projectSchema = new schema.Entity("projects", { tasks: [taskSchema] });

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

export function filterTasks(searchTerm) {
  return {
    type: "FILTER_TASKS",
    payload: {
      searchTerm,
    },
  };
}

function fetchProjectsStarted(boards) {
  return { type: "FETCH_PROJECTS_STARTED", payload: { boards } };
}

function fetchProjectsSucceeded(projects) {
  return { type: "FETCH_PROJECTS_SUCCEEDED", payload: { projects } };
}

function fetchProjectsFailed(err) {
  return { type: "FETCH_PROJECTS_FAILED", payload: err };
}

function receiveEntities(entities) {
  return {
    type: "RECEIVE_ENTITIES",
    payload: entities,
  };
}

export function fetchProjects() {
  return (dispatch, getState) => {
    dispatch(fetchProjectsStarted());

    return api
      .fetchProjects()
      .then((resp) => {
        const projects = resp.data;

        const normalizedData = normalize(projects, [projectSchema]);

        dispatch(receiveEntities(normalizedData));

        if (!getState().page.currentProjectId) {
          const defaultProjectId = projects[0].id;
          dispatch(setCurrentProjectId(defaultProjectId));
        }
      })
      .catch((err) => {
        console.error(err);

        fetchProjectsFailed(err);
      });
  };
}

export function setCurrentProjectId(id) {
  return {
    type: "SET_CURRENT_PROJECT_ID",
    payload: {
      id,
    },
  };
}
