import { loadAssets } from "./assetLoader";
import { COLORS } from "./constants";
import Dog from "./entities/dog";
import k from "./kaplayCtx";

loadAssets();

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
  k.add([k.sprite("background"), k.pos(0, -10), k.z(1)]);

  const score = k.add([
    k.text("000000", { font: "nes", size: 8 }),
    k.pos(192, 197),
    k.z(2),
  ]);

  const roundCount = k.add([
    k.text("1", { font: "nes", size: 8 }),
    k.pos(42, 182),
    k.z(2),
    k.color(COLORS.GREEN2),
  ]);

  const duckIconColors = k.add([k.pos(95, 198)]);
  for (let i = 0; i < 9; i++) {
    duckIconColors.add([
      k.rect(9, 9),
      k.pos(i * 9, 0),
      //k.color(k.Color.fromHex(COLORS.RED)),
    ]);
  }

  const dog = new Dog(k.vec2(0, k.center().y));
  dog.searchForDucks();

  const cursor = k.add([
    k.sprite("cursor"),
    k.anchor("center"),
    k.pos(),
    k.z(3),
  ]);
  cursor.onUpdate(() => {
    cursor.moveTo(k.mousePos());
  });
});

k.go("main-menu");
