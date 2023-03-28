import { createRoot } from "react-dom/client";
import React from "react";
import "./scss/styles.scss";
import MainView from "./components/main-view/main-view";
import store from "./app/store";
import { Provider } from "react-redux";

const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<MyFlixApplication />);
