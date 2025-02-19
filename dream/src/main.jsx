import React from "react";
import reactDom from "react-dom/client";
import ReactUI from "./ReactUI";
import { Provider } from "jotai";
import { store } from "./state";

const ui = document.getElementById("ui");
const root = reactDom.createRoot(ui);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactUI />
    </Provider>
  </React.StrictMode>
);
