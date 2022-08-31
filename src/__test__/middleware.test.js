import analytics from "../middleware/analytics";

import sinon from "sinon";
import * as api from "../middleware/exampleService";

const fakeAnalyticsApi = sinon
  .stub(api, "fakeAnalyticsApi")
  .returns(new Promise((resolve) => "Success"));

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();
  const invoke = (action) => analytics(store)(next)(action);
  return { store, next, invoke };
};

describe("analytics middleware", () => {
  it("should pass on irrelevant keys", () => {
    const { next, invoke } = create();

    const action = { type: "IRRELEVANT" };

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    sinon.assert.notCalled(fakeAnalyticsApi);
  });

  it("should make an analytics API call", () => {
    const { next, invoke } = create();

    const action = {
      type: "RELEVANT",
      meta: {
        analytics: {
          event: "foo",
          data: { extra: "stuff" },
        },
      },
    };

    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    sinon.assert.called(fakeAnalyticsApi);
  });
});
