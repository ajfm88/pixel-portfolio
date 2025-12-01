import gameManager from "../gameManager";
import { COLORS } from "../constants";
import k from "../kaplayCtx";

export default class Duck {
  timer = 0;

  constructor(id, speed) {
    this.speed = speed;
    this.id = id;
    const startingPos = [
      k.vec2(80, k.center().y + 40),
      k.vec2(k.center().x, k.center().y + 40),
      k.vec2(200, k.center().y + 40),
    ];

    const angles = [k.vec2(-1, -1), k.vec2(1, -1), k.vec2(1, -1)];

    const chosenPosIndex = k.randi(startingPos.length);
    const chosenAngleIndex = k.randi(angles.length);

    this.gameObj = k.add([
      k.sprite("duck", { anim: "flight-side" }),
      k.area({ shape: new k.Rect(k.vec2(0), 24, 24) }),
      k.body(),
      k.anchor("center"),
      k.pos(startingPos[chosenPosIndex]),
      k.state("fly", ["fly", "shot", "fall"]),
      k.timer(),
      k.offscreen({ destroy: true, distance: 100 }),
    ]);

    this.angle = angles[chosenAngleIndex];
    // make duck face the correct direction
    if (this.angle.x < 0) this.gameObj.flipX = true;

    this.quackingSound = k.play("quacking", { volume: 0.5, loop: true });
    this.flappingSound = k.play("flapping", { loop: true, speed: 2 });
  }

  setBehavior() {
    this.gameObj.onStateUpdate("fly", () => {
      if (
        this.timer < 5 &&
        (this.gameObj.pos.x > k.width() + 10 || this.gameObj.pos.x < 10)
      ) {
        this.angle.x = -this.angle.x;
        this.angle.y = this.angle.y;
        this.gameObj.flipX = !this.gameObj.flipX;

        const currentAnim =
          this.gameObj.getCurAnim().name === "flight-side"
            ? "flight-diagonal"
            : "flight-side";
        this.gameObj.play(currentAnim);
      }

      if (this.gameObj.pos.y < -10 || this.gameObj.pos.y > k.height() - 70) {
        this.angle.y = -this.angle.y;

        const currentAnim =
          this.gameObj.getCurAnim().name === "flight-side"
            ? "flight-diagonal"
            : "flight-side";
        this.gameObj.play(currentAnim);
      }

      this.gameObj.move(k.vec2(this.angle).scale(this.speed));
    });

    this.gameObj.onStateEnter("shot", async () => {
      gameManager.nbDucksShotInRound++;
      this.gameObj.play("shot");
      this.quackingSound.stop();
      this.flappingSound.stop();
      await k.wait(0.2);
      this.gameObj.enterState("fall");
    });

    this.gameObj.onStateEnter("fall", () => {
      this.fallSound = k.play("fall");
      this.gameObj.play("fall");
    });

    this.gameObj.onStateUpdate("fall", async () => {
      this.gameObj.move(0, this.speed);

      if (this.gameObj.pos.y > k.height() - 70) {
        this.fallSound.stop();
        k.play("impact");
        k.destroy(this.gameObj);
        delete this; // Destroy the Duck instance
        sky.color = k.Color.fromHex(COLORS.BLUE);
        await k.wait(1);
        gameManager.stateMachine.enterState("duck-hunted");
      }
    });

    this.gameObj.onClick(() => {
      if (gameManager.nbBulletsLeft < 0) return;
      gameManager.currentScore += 100;
      this.gameObj.play("shot");
      const duckIcon = k.get(`duckIcon-${this.id}`, { recursive: true })[0];
      if (duckIcon) duckIcon.color = k.Color.fromHex(COLORS.RED);
      this.gameObj.enterState("shot");
    });

    const sky = k.get("sky")[0];
    this.gameObj.loop(1, () => {
      this.timer += 1;

      if (this.timer === 5) {
        sky.color = k.Color.fromHex(COLORS.BEIGE);
      }
    });

    this.gameObj.onExitScreen(() => {
      this.quackingSound.stop();
      this.flappingSound.stop();
      sky.color = k.Color.fromHex(COLORS.BLUE);
      delete this; // Destroy the Duck instance
      gameManager.nbBulletsLeft = 3;
      gameManager.stateMachine.enterState("duck-escaped");
    });
  }
}
