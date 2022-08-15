import configureMockStore from "redux-mock-store";
import { createTaskSucceeded, createTask } from "../actions/index";
import thunk from "redux-thunk";
import sinon from "sinon";
import * as api from "../api";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("createTask", () => {
  it("works", () => {
    var createTaskMock = sinon
      .stub(api, "createTask")
      .returns(new Promise((resolve) => resolve({ data: "foo" })));

    const expectedActions = [
      { type: "CREATE_TASK_SUCCEEDED", payload: { task: "foo" } },
    ];

    const store = mockStore({
      tasks: {
        tasks: [],
      },
    });

    return store.dispatch(createTask({})).then(() => {
      console.log("store.getActions()", store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
      sinon.assert.called(createTaskMock);
    });
  });
});

describe("action creators", () => {
  it("should handle succesful task creation", () => {
    const task = { title: "Get schwifty", description: "Show me what you got" };
    const expectedAction = { type: "CREATE_TASK_SUCCEEDED", payload: { task } };
    expect(createTaskSucceeded(task)).toEqual(expectedAction);
  });
});
