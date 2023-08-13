import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SwitchProvider } from "./context/SwitchTheme.jsx";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducer/index.jsx";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

// const store = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(thunk)),
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SwitchProvider>
        <App />
      </SwitchProvider>
    </Provider>
  </React.StrictMode>,
);
