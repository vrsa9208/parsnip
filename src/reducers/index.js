const initialState = {
  isLoading: false,
  error: null,
  tasks: [],
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
    default:
      return state;
  }
}
