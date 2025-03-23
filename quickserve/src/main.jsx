import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./features/store/Store.jsx";
import "./index.css";
import App from "./App.jsx";
import NetworkStatus from "./networkcheck.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NetworkStatus />
    <App />
  </Provider>
);
