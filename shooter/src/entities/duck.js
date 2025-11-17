import k from "../kaplayCtx";

export default class Duck {
  speed = 100;

  constructor() {
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
    ]);

    this.angle = angles[chosenAngleIndex];

    this.gameObj.onUpdate(() => {
      if (this.gameObj.pos.x > k.width() || this.gameObj.pos.x < 10) {
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

    this.gameObj.onCollide("bounds", () => {});
  }
}
