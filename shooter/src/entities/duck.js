import gameManager from "../gameManager";
import { COLORS } from "../constants";
import k from "../kaplayCtx";

export default class Duck {
  speed = 100;
  timer = 0;

  constructor(id) {
    this.id = id;
    const startingPos = [
      k.vec2(80, k.center().y + 40),
      k.vec2(k.center().x, k.center().y + 40),
      k.vec2(200, k.center().y + 40),
    ];

    const angles = [k.vec2(-0.5, -0.5), k.vec2(0.5, -0.5), k.vec2(1, -1)];

    const chosenPosIndex = k.randi(startingPos.length);
    const chosenAngleIndex = k.randi(angles.length);

    this.gameObj = k.add([
      k.sprite("duck", { anim: "flight-side" }),
      k.area({ shape: new k.Rect(k.vec2(0), 32, 32) }),
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
  }

  setDuckBehavior() {
    this.gameObj.onStateUpdate("fly", () => {
      if (
        this.timer < 5 &&
        (this.gameObj.pos.x > k.width() || this.gameObj.pos.x < 10)
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

      if (this.gameObj.pos.y < 0 || this.gameObj.pos.y > k.height() - 70) {
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
      this.gameObj.play("shot");
      await k.wait(0.2);
      this.gameObj.enterState("fall");
    });

    this.gameObj.onStateEnter("fall", () => {
      this.gameObj.play("fall");
    });

    this.gameObj.onStateUpdate("fall", () => {
      this.gameObj.move(0, this.speed);

      if (this.gameObj.pos.y > k.height() - 70) {
        k.destroy(this.gameObj);
        delete this; // Destroy the Duck instance
        sky.color = k.Color.fromHex(COLORS.BLUE);
        gameManager.nbBulletsLeft = 3;
        gameManager.stateMachine.enterState("duck-hunted");
      }
    });

    this.gameObj.onClick(() => {
      if (gameManager.nbBulletsLeft < 0) return;
      this.gameObj.play("shot");
      const duckIcon = k.get(`duckIcon-${this.id}`, { recursive: true })[0];
      if (duckIcon) duckIcon.use(k.color(k.Color.fromHex(COLORS.RED)));
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
      sky.color = k.Color.fromHex(COLORS.BLUE);
      delete this; // Destroy the Duck instance
      gameManager.nbBulletsLeft = 3;
      gameManager.stateMachine.enterState("duck-escaped");
    });
  }
}
