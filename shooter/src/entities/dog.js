import k from "../kaplayCtx";
import gameManager from "../gameManager";

export default class Dog {
  speed = 15;

  constructor(position) {
    this.gameObj = k.add([
      k.sprite("dog"),
      k.pos(position),
      k.state("search", ["search", "snif", "detect", "jump", "drop"]),
      k.z(2),
    ]);

    this.sniffingSound = k.play("sniffing", { volume: 2 });
    this.sniffingSound.stop();

    this.barkingSound = k.play("barking");
    this.barkingSound.stop();

    this.laughingSound = k.play("laughing");
    this.laughingSound.stop();

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
      this.sniffingSound.play();
      k.wait(2, () => {
        this.sniffingSound.stop();
        if (nbSnifs === 2) {
          this.gameObj.enterState("detect");
          return;
        }
        this.gameObj.enterState("search");
      });
    });

    this.gameObj.onStateEnter("detect", () => {
      this.barkingSound.play();
      this.gameObj.play("detect");
      k.wait(1, () => {
        this.barkingSound.stop();
        this.gameObj.enterState("jump");
      });
    });

    this.gameObj.onStateEnter("jump", () => {
      this.barkingSound.play();
      this.gameObj.play("jump");
      k.wait(0.5, () => {
        this.barkingSound.stop();
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
        125,
        0.5,
        (newY) => (this.gameObj.pos.y = newY),
        k.easings.linear
      );
      gameManager.stateMachine.enterState("round-start", true);
    });
  }

  async slideUpAndDown() {
    await k.tween(
      this.gameObj.pos.y,
      90,
      0.4,
      (newY) => (this.gameObj.pos.y = newY),
      k.easings.linear
    );
    await k.wait(1);
    await k.tween(
      this.gameObj.pos.y,
      125,
      0.4,
      (newY) => (this.gameObj.pos.y = newY),
      k.easings.linear
    );
  }

  async catchFallenDuck() {
    this.gameObj.play("catch");
    k.play("successful-hunt");
    await this.slideUpAndDown();
    gameManager.stateMachine.enterState("hunt-end");
  }

  async mockPlayer() {
    this.laughingSound.play();
    this.gameObj.play("mock");
    await this.slideUpAndDown();
    gameManager.stateMachine.enterState("hunt-end");
  }
}
