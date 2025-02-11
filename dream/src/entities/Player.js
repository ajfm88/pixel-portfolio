import dataManager from "../managers/DataManager";

export default class Player {
  #speed;

  constructor(posVec2, speed) {
    this.gameObj = add([
      rect(60, 60),
      anchor("center"),
      area(),
      outline(6),
      body(),
      pos(posVec2),
      "player",
    ]);
    this.#speed = speed;
    this.setCameraMovement();
  }

  setControls() {
    if (dataManager.deviceType.includes("mobile")) {
      let currentButton = "none";
      const leftButton = get("left-button", { recursive: true })[0];
      const rightButton = get("right-button", { recursive: true })[0];
      const upButton = get("up-button", { recursive: true })[0];
      const downButton = get("down-button", { recursive: true })[0];

      leftButton.onClick(() => (currentButton = "left-button"));
      rightButton.onClick(() => (currentButton = "right-button"));
      upButton.onClick(() => (currentButton = "up-button"));
      downButton.onClick(() => (currentButton = "down-button"));

      onMouseRelease("left", () => (currentButton = "none"));

      this.gameObj.onUpdate(() => {
        if (currentButton === "left-button") this.gameObj.move(-this.#speed, 0);
        if (currentButton === "right-button") this.gameObj.move(this.#speed, 0);
        if (currentButton === "up-button") this.gameObj.move(0, -this.#speed);
        if (currentButton === "down-button") this.gameObj.move(0, this.#speed);
      });
      return;
    }

    this.gameObj.onUpdate(() => {
      if (isButtonDown("left")) this.gameObj.move(-this.#speed, 0);
      if (isButtonDown("right")) this.gameObj.move(this.#speed, 0);
      if (isButtonDown("up")) this.gameObj.move(0, -this.#speed);
      if (isButtonDown("down")) this.gameObj.move(0, this.#speed);
    });
  }

  setCameraMovement() {
    this.gameObj.onUpdate(() => {
      camPos(this.gameObj.pos);
    });
  }
}
