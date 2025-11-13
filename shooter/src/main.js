import k from "./kaplayCtx";

k.loadFont("nes", "./fonts/nintendo-nes-font/nintendo-nes-font.ttf");

k.add([k.rect(k.width(), k.height()), k.color(0, 0, 0)]);

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
