import { COLORS } from "./constants";
import k from "./kaplayCtx";

k.loadSprite("background", "./background.png");
k.loadSprite("menu", "./menu.png");
k.loadSprite("cursor", "./cursor.png");
k.loadFont("nes", "./fonts/nintendo-nes-font/nintendo-nes-font.ttf");

k.scene("main-menu", () => {
  k.add([k.sprite("menu")]);

  k.add([
    k.text("CLICK TO START", { font: "nes", size: 8 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 40),
  ]);

  k.add([
    k.text("000000", { font: "nes", size: 8 }),
    k.pos(150, 184),
    k.color(k.Color.fromHex(COLORS.GREEN)),
  ]);

  k.onClick(() => {
    k.go("game");
  });
});

k.scene("game", () => {
  k.setCursor("none");
  k.add([k.rect(k.width(), k.height()), k.color(k.Color.fromHex(COLORS.BLUE))]);

  k.add([k.sprite("background"), k.pos(0, -10)]);

  const msg = k.add([
    k.text("HELLO WORLD!", { font: "nes", size: 8 }),
    k.anchor("center"),
    k.pos(k.center()),
    k.area(),
  ]);
  let counter = 0;
  msg.onClick(() => {
    counter += 1;
    msg.text = counter;
  });

  const cursor = k.add([
    k.sprite("cursor"), // sprite
    k.anchor("center"),
    k.pos(),
  ]);
  cursor.onUpdate(() => {
    cursor.moveTo(k.mousePos());
  });
});

k.go("main-menu");
