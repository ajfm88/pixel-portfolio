import React from "react";
import reactDom from "react-dom/client";
import ReactUI from "./ReactUI";
import { Provider } from "jotai";
import { store } from "./state";

// const settings = document.getElementById("settings");
// const desktopBtn = settings.children[1];
// const mobileVerticalBtn = settings.children[2];
// const mobileHorizontalBtn = settings.children[3];

// mobileVerticalBtn.addEventListener("click", () => {
//   dataManager.deviceType = "mobile-vertical";
//   initGame(1080, 1920);
//   settings.remove();
// });

// mobileHorizontalBtn.addEventListener("click", () => {
//   dataManager.deviceType = "mobile-horizontal";
//   initGame(1920, 1080);
//   settings.remove();
// });

// desktopBtn.addEventListener("click", () => {
//   dataManager.deviceType = "desktop";
//   initGame(1920, 1080);
//   settings.remove();
// });

// const modal = document.querySelector(".modal");
// const modalBtns = document.querySelectorAll(".modal-btn");

// for (const modalBtn of modalBtns) {
//   modalBtn.addEventListener("click", () => {
//     if (modalBtn.innerText === "Yes") {
//     }
//   });
// }

const ui = document.getElementById("ui");
const root = reactDom.createRoot(ui);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactUI />
    </Provider>
  </React.StrictMode>
);
