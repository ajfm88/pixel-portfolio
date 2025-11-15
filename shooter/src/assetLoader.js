import k from "./kaplayCtx";

export function loadAssets() {
  k.loadSprite("background", "./background.png");
  k.loadSprite("menu", "./menu.png");
  k.loadSprite("cursor", "./cursor.png");
  k.loadFont("nes", "./fonts/nintendo-nes-font/nintendo-nes-font.ttf");
  k.loadSprite("dog", "./dog.png", {
    sliceX: 4,
    sliceY: 3,
    anims: {
      search: { from: 0, to: 3, speed: 6, loop: true },
      snif: { from: 4, to: 5, speed: 4, loop: true },
      detect: 6,
      jump: { from: 7, to: 8, speed: 6 },
    },
  });
}
