import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import tasksReducer from "./reducers";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "./middleware/logger";

const rootReducer = (state = {}, action) => ({
  tasks: tasksReducer(state.tasks, action),
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// if (module.hot) {
//   module.hot.accept("./App", () => {
//     const NextApp = require("./App").default;
//     ReactDOM.render(
//       <React.StrictMode>
//         <Provider store={store}>
//           <NextApp />
//         </Provider>
//       </React.StrictMode>,
//       document.getElementById("root")
//     );
//   });

//   module.hot.accept("./reducers", () => {
//     const nextRootReducer = require("./reducers").default;
//     store.replaceReducer(nextRootReducer);
//   });
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
