import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SwitchProvider } from "./context/SwitchTheme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SwitchProvider>
      <App />
    </SwitchProvider>
  </React.StrictMode>
);
