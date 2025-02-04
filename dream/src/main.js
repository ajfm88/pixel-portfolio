import kaplay from "kaplay";
import "kaplay/global";
import Player from "./entities/Player";
import Section from "./components/Section";
import Button from "./components/Button";
import dataManager from "./managers/DataManager";
import { Dpad } from "./components/Dpad";

function initGame(width, height) {
  kaplay({
    width,
    height,
    letterbox: true,
    pixelDensity: devicePixelRatio,
    touchToMouse: true,
    debug: false,
    debugKey: "f1",
    buttons: {
      left: {
        keyboard: ["a", "left"],
      },
      right: {
        keyboard: ["d", "right"],
      },
      up: {
        keyboard: ["w", "up"],
      },
      down: {
        keyboard: ["s", "down"],
      },
    },
  });
  loadFont("mania", "/fonts/mania.ttf");

  scene("portfolio-land", () => {
    new Section(vec2(center().x, center().y - 300), "About");
    new Section(vec2(center().x, center().y + 300), "Projects");
    new Section(vec2(center().x - 300, center().y), "Skills");
    new Section(vec2(center().x + 300, center().y), "Work Experience");

    const player = new Player(vec2(center()), 700);
    if (dataManager.deviceType === "mobile-vertical") new Dpad(vec2(150, 1600));
    if (dataManager.deviceType === "mobile-horizontal")
      new Dpad(vec2(100, 750));
    player.setControls();
  });

  go("portfolio-land");
}

const settings = document.getElementById("settings");
const mobileVerticalBtn = settings.children[1];
const mobileHorizontalBtn = settings.children[2];
const desktopBtn = settings.children[3];

mobileVerticalBtn.addEventListener("click", () => {
  dataManager.deviceType = "mobile-vertical";
  initGame(1080, 1920);
  settings.remove();
});

mobileHorizontalBtn.addEventListener("click", () => {
  dataManager.deviceType = "mobile-horizontal";
  initGame(1920, 1080);
  settings.remove();
});

desktopBtn.addEventListener("click", () => {
  dataManager.deviceType = "desktop";
  initGame(1920, 1080);
  settings.remove();
});
