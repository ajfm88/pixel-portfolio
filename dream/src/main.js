import kaplay from "kaplay";
import "kaplay/global";
import Player from "./entities/Player";
import Section from "./components/Section";
import Button from "./components/Button";
import dataManager from "./managers/DataManager";
import { Dpad } from "./components/Dpad";
import makeTiledBackground from "./components/TiledBackground";
import { PALETTE } from "./constants";
import LinkIcon from "./components/LinkIcon";

function initGame(width, height) {
  const canvas = kaplay({
    width,
    height,
    letterbox: true,
    pixelDensity: devicePixelRatio,
    touchToMouse: true,
    debug: true, // TODO: set this back to false in prod
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
  loadFont("inter", "/fonts/inter.ttf");
  loadFont("ibm-regular", "/fonts/IBMPlexSans-Regular.ttf");
  loadFont("ibm-bold", "/fonts/IBMPlexSans-Bold.ttf");

  loadSprite("github-logo", "/logos/github-logo.png");

  loadShaderURL("tiledPattern", null, "/shaders/tiledPattern.frag");

  scene("portfolio-land", () => {
    makeTiledBackground(canvas.width(), canvas.height(), "");

    new Section(vec2(center().x, center().y - 400), "About", (root) => {
      const newComponent = root.add([
        text("Hi, I'm JSLegendDev!", { font: "ibm-bold", size: 88 }),
        color(Color.fromHex(PALETTE.color1)),
        pos(10, -500),
        opacity(0),
      ]);

      newComponent.add([
        text("I'm a creative software developer", {
          font: "ibm-bold",
          size: 48,
        }),
        color(Color.fromHex(PALETTE.color1)),
        pos(5, 100),
        opacity(0),
      ]);

      new LinkIcon(
        newComponent,
        vec2(300, 250),
        { name: "github-logo", width: 228.6, height: 179.5 },
        "GitHub",
        "https://github.com/jslegenddev"
      );

      tween(
        newComponent.opacity,
        1,
        0.5,
        (val) => {
          newComponent.opacity = val;
          for (const child of newComponent.children) {
            child.opacity = val;
          }
        },
        easings.linear
      );
    });
    new Section(vec2(center().x, center().y + 400), "Projects");
    new Section(vec2(center().x - 400, center().y), "Skills");
    new Section(vec2(center().x + 400, center().y), "Work Experience");

    const player = new Player(vec2(center()), 700);
    if (dataManager.deviceType === "mobile-vertical") new Dpad(vec2(150, 1600));
    if (dataManager.deviceType === "mobile-horizontal")
      new Dpad(vec2(100, 750));
    player.setControls();
  });

  go("portfolio-land");
}

const settings = document.getElementById("settings");
const desktopBtn = settings.children[1];
const mobileVerticalBtn = settings.children[2];
const mobileHorizontalBtn = settings.children[3];

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
