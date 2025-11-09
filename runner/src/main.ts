import k from "./kaplayCtx";
import { makeRing, makeSonic } from "./entities";
import { GameObj } from "kaplay";

k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");
k.loadSprite("sonic", "graphics/sonic.png", {
  sliceX: 8,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 30 },
    jump: { from: 8, to: 15, loop: true, speed: 100 },
  },
});
k.loadSprite("ring", "graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});
k.loadSprite("motobug", "graphics/motobug.png", {
  sliceX: 5,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 },
  },
});
k.loadFont("mania", "fonts/mania.ttf");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");

k.scene("game", () => {
  k.setGravity(3100);

  let gameSpeed = 100;
  k.loop(1, () => {
    gameSpeed += 50;
  });
  let score = 0;
  let scoreMultiplier = 0;
  const scoreText = k.add([
    k.text("SCORE : 0", { font: "mania", size: 48 }),
    k.pos(20, 20),
    k.z(2),
  ]);

  const bgPieceWidth = 1450;
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.opacity(0.8), k.scale(1.5)]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgPieceWidth, 0),
      k.opacity(0.8),
      k.scale(1.5),
    ]),
  ];

  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(2)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(2)]),
  ];

  const sonic = makeSonic(k.vec2(100, 100));
  sonic.setControls();
  sonic.setEvents();

  const ringCollectUI = sonic.add([
    k.text("", { font: "mania", size: 18 }),
    k.color(255, 255, 0),
    k.anchor("center"),
    k.pos(30, -10),
  ]);

  // static body for the platforms
  k.add([
    k.rect(1280, 200),
    k.opacity(0),
    k.pos(0, 641),
    k.area(),
    k.body({ isStatic: true }),
  ]);

  const spawnRing = () => {
    const ring = makeRing(k.vec2(1280, 610));
    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) k.destroy(ring);
    });

    const waitTime = k.rand(0.5, 3);

    k.wait(waitTime, spawnRing);
  };

  spawnRing();

  sonic.onCollide("ring", (ring: GameObj) => {
    k.play("ring", { volume: 0.5 });
    k.destroy(ring);
    score++;
    scoreText.text = `SCORE : ${score}`;
    ringCollectUI.text = "+1";
    k.wait(1, () => {
      ringCollectUI.text = "";
    });
  });

  k.onUpdate(() => {
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      const frontBgPiece = bgPieces.shift();
      // so typescript shuts up
      if (frontBgPiece) bgPieces.push(frontBgPiece);
    }

    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 2, 450);
      const frontPlatform = platforms.shift();
      if (frontPlatform) platforms.push(frontPlatform);
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 2, 450);
  });
});

k.scene("game-over", () => {});

k.go("game");
