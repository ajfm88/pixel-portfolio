import kaplay from "kaplay";
import "kaplay/global";
import Player from "./entities/Player";
import Section from "./components/Section";
import Button from "./components/Button";
import dataManager from "./managers/DataManager";

function initGame(width, height) {
  kaplay({
    width,
    height,
    letterbox: true,
    pixelDensity: devicePixelRatio,
  });
  loadFont("mania", "/fonts/mania.ttf");

  scene("portfolio-land", () => {
    new Section(vec2(center().x, center().y - 300));
    new Section(vec2(center().x, center().y + 300));
    new Section(vec2(center().x - 300, center().y));
    new Section(vec2(center().x + 300, center().y));

    const player = new Player(vec2(center()), 300);
  });

  go("portfolio-land");
}

const settings = document.getElementById("settings");
const mobileBtn = settings.children[1];
const notMobileBtn = settings.children[2];

mobileBtn.addEventListener("click", () => {
  dataManager.setIsMobile(true);
  initGame(1080, 1920);
  settings.remove();
});
notMobileBtn.addEventListener("click", () => {
  dataManager.setIsMobile(false);
  initGame(1920, 1080);
  settings.remove();
});
