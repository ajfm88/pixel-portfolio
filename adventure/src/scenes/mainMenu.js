import menuText from "../content/menuText.js";
import { gameState } from "../state/stateManagers.js";
import { colorizeBackground } from "../utils.js";

export default function mainMenu(k) {
  const locales = ["english", "spanish"];

  const currentLocale = gameState.getLocale();

  colorizeBackground(k, 0, 0, 0);

  k.add([
    k.text(menuText[currentLocale].title, { size: 32, font: "gameboy" }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 100),
  ]);

  k.add([
    k.text(menuText[currentLocale].languageIndication, {
      size: 10,
      font: "gameboy",
    }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 100),
  ]);

  k.add([
    k.text(menuText[currentLocale].playIndication, {
      size: 24,
      font: "gameboy",
    }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 200),
  ]);

  k.onKeyPress("s", () => {
    if (currentLocale !== "spanish") gameState.setLocale("spanish");
    if (currentLocale !== "english") gameState.setLocale("english");
    k.go("mainMenu");
  });

  k.onKeyPress("enter", () => {
    if (gameState.getLocale() === "spanish") gameState.setFontSize(28);
    k.go("world");
  });
}
