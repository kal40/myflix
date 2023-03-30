import { createRoot } from "react-dom/client";
import React from "react";
import throttle from "lodash.throttle";
import "./scss/styles.scss";
import MainView from "./components/main-view/main-view";
import store from "./app/store";
import { Provider } from "react-redux";
import { saveState } from "./app/localStorage";

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<MyFlixApplication />);
