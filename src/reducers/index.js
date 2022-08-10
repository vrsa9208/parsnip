import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";

const initialState = {
  items: [],
  error: null,
  isLoading: false,
};

export function projects(state = initialState, action) {
  switch (action.type) {
    case "FETCH_PROJECTS_STARTED":
      return { ...state, isLoading: true };
    case "FETCH_PROJECTS_SUCCEEDED":
      return { ...state, isLoading: false, items: action.payload.projects };
    default:
      return state;
  }
}

const initialPageState = {
  currentProjectId: null,
  searchTerm: "",
};

export function page(state = initialPageState, action) {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_ID": {
      return {
        ...state,
        currentProjectId: action.payload.id,
      };
    }
    case "FILTER_TASKS": {
      return { ...state, searchTerm: action.searchTerm };
    }
    default: {
      return state;
    }
  }
}

const getSearchTerm = (state) => state.page.searchTerm;

const getTasksByProjectId = (state) => {
  if (!state.page.currentProjectId) {
    return [];
  }

  const currentProject = state.projects.items.find(
    (project) => project.id === state.page.currentProjectId
  );

  return currentProject.tasks;
};

export const getFilteredTasks = createSelector(
  [getTasksByProjectId, getSearchTerm],
  (tasks, searchTerm) => {
    return tasks.filter((task) =>
      task.title.match(new RegExp(searchTerm, "i"))
    );
  }
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  (tasks) => {
    const result = {};
    TASK_STATUSES.forEach((status) => {
      result[`${status}`] = tasks.filter((task) => task.status === status);
    });

    return result;
  }
);
