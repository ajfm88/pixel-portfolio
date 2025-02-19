import dataManager from "../managers/DataManager";
import { DPadInputAtom, isVisibleAtom, store } from "../state";

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
    this.gameObj.onUpdate(() => {
      if (store.get(isVisibleAtom)) {
        store.set(DPadInputAtom, {
          isLeftPressed: false,
          isRightPressed: false,
          isUpPressed: false,
          isDownPressed: false,
        });
        return;
      }

      const DPadInput = store.get(DPadInputAtom);

      if (isButtonDown("left") || DPadInput.isLeftPressed)
        this.gameObj.move(-this.#speed, 0);
      if (isButtonDown("right") || DPadInput.isRightPressed)
        this.gameObj.move(this.#speed, 0);
      if (isButtonDown("up") || DPadInput.isUpPressed)
        this.gameObj.move(0, -this.#speed);
      if (isButtonDown("down") || DPadInput.isDownPressed)
        this.gameObj.move(0, this.#speed);
    });
  }

  setCameraMovement() {
    this.gameObj.onUpdate(() => {
      camPos(this.gameObj.pos);
    });
  }
}
