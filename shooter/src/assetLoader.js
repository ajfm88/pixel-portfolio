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
      catch: 9,
      mock: { from: 10, to: 11, loop: true },
    },
  });
  k.loadSprite("duck", "./duck.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
      "flight-diagonal": { from: 0, to: 2, loop: true },
      "flight-side": { from: 3, to: 5, loop: true },
      shot: 6,
      fall: 7,
    },
  });
  k.loadSprite("text-box", "./text-box.png");
  k.loadSound("gun-shot", "./sounds/gun-shot.wav");
  k.loadSound("quacking", "./sounds/quacking.wav");
  k.loadSound("flapping", "./sounds/flapping.ogg");
  k.loadSound("fall", "./sounds/fall.wav");
  k.loadSound("impact", "./sounds/impact.wav");
  k.loadSound("sniffing", "./sounds/sniffing.wav");
  k.loadSound("barking", "./sounds/barking.wav");
  k.loadSound("laughing", "./sounds/laughing.wav");
  k.loadSound("ui-appear", "./sounds/ui-appear.wav");
}
