import database from "../Database/Firebase.config.js";
import { StrictMode } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Features/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
