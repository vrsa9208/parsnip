import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";

const initialState = {
  isLoading: false,
  error: null,
  tasks: [],
  searchTerm: "",
};

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case "FETCH_TASKS_STARTED":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_TASKS_SUCCEEDED":
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
      };
    case "FETCH_TASKS_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case "CREATE_TASK_SUCCEEDED":
      return {
        ...state,
        tasks: state.tasks.concat(action.payload.task),
      };
    case "UPDATE_TASK_SUCCEEDED": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.task.id ? action.payload.task : task
        ),
      };
    }
    case "TIMER_INCREMENT": {
      const nextTasks = state.tasks.map((task) => {
        if (task.id === action.payload.taskId) {
          return { ...task, timer: task.timer + 1 };
        }
        return task;
      });

      return { ...state, tasks: nextTasks };
    }
    case "FILTER_TASKS":
      return { ...state, searchTerm: action.payload.searchTerm };
    default:
      return state;
  }
}

const getTasks = (state) => state.tasks.tasks;
const getSearchTerm = (state) => state.tasks.searchTerm;

export const getFilteredTasks = createSelector(
  [getTasks, getSearchTerm],
  (tasks, searchTerm) => {
    return tasks.filter((task) =>
      task.title.match(new RegExp(searchTerm, "i"))
    );
  }
);

export const getGroupedTasks = createSelector([getFilteredTasks], (tasks) => {
  const result = {};
  TASK_STATUSES.forEach((status) => {
    result[`${status}`] = tasks.filter((task) => task.status === status);
  });

  return result;
});
