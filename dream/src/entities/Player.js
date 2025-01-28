export default class Player {
  constructor(posVec2, speed) {
    this.gameObj = add([rect(60, 60), anchor("center"), body(), pos(posVec2)]);
    this.speed = speed;
    this.setControls();
    this.setCameraMovement();
  }

  setControls() {
    onMouseDown("left", () => {
      this.gameObj.moveTo(mousePos(), this.speed);
    });
  }

  setCameraMovement() {
    this.gameObj.onUpdate(() => {
      camPos(this.gameObj.pos);
    });
  }
}
