const analytics = (store) => (next) => (action) => {
  if (!action || !action.meta || !action.meta.analytics) {
    return next(action);
  }

  const { event, data } = action.meta.analytics;

  fakeAnalyticsApi(event, data)
    .then((response) => {
      console.log("Recorded", event, data, response);
    })
    .catch((error) => {
      console.error(
        "An error occurred while sending analytics",
        error.toString()
      );
    });

  return next(action);
};

const fakeAnalyticsApi = (eventName, data) => {
  return new Promise((resolve) => {
    resolve("Success");
  });
};

export default analytics;
