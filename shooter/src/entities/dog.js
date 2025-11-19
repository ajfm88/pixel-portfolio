import k from "../kaplayCtx";
import gameStateManager from "../stateManager";

export default class Dog {
  speed = 15;

  constructor(position) {
    this.gameObj = k.add([
      k.sprite("dog"),
      k.pos(position),
      k.state("search", ["search", "snif", "detect", "jump", "drop"]),
      k.z(2),
    ]);

    return this;
  }

  searchForDucks() {
    let nbSnifs = 0;
    this.gameObj.onStateEnter("search", () => {
      this.gameObj.play("search");
      k.wait(2, () => {
        this.gameObj.enterState("snif");
      });
    });

    this.gameObj.onStateUpdate("search", () => {
      this.gameObj.move(this.speed, 0);
    });

    this.gameObj.onStateEnter("snif", () => {
      nbSnifs++;
      this.gameObj.play("snif");
      k.wait(2, () => {
        if (nbSnifs === 2) {
          this.gameObj.enterState("detect");
          return;
        }
        this.gameObj.enterState("search");
      });
    });

    this.gameObj.onStateEnter("detect", () => {
      this.gameObj.play("detect");
      k.wait(1, () => {
        this.gameObj.enterState("jump");
      });
    });

    this.gameObj.onStateEnter("jump", () => {
      this.gameObj.play("jump");
      k.wait(0.5, () => {
        this.gameObj.use(k.z(0));
        this.gameObj.enterState("drop");
      });
    });

    this.gameObj.onStateUpdate("jump", () => {
      this.gameObj.move(100, -50);
    });

    this.gameObj.onStateEnter("drop", async () => {
      await k.tween(
        this.gameObj.pos.y,
        150,
        0.5,
        (nextValue) => (this.gameObj.pos.y = nextValue),
        k.easings.linear
      );
      gameStateManager.gameObj.enterState("game");
    });
  }
}
