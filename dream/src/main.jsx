import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactUI from "./ReactUI";
import { Provider } from "jotai";
import { store } from "./store";

const ui = document.getElementById("ui");
const root = createRoot(ui);
root.render(
  <StrictMode>
    <Provider store={store}>
      <ReactUI />
    </Provider>
  </StrictMode>
);
