export const fakeAnalyticsApi = (eventName, data) => {
  return new Promise((resolve) => {
    resolve("Success");
  });
};
