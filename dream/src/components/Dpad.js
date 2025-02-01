export class Dpad {
  constructor(posVec2) {
    this.pad = add([pos(posVec2), anchor("center"), fixed()]);
    this.leftButton = this.pad.add([
      rect(200, 100),
      anchor("center"),
      pos(20, 0),
      opacity(0.5),
      area(),
      "left-button",
    ]);

    this.rightButton = this.pad.add([
      rect(200, 100),
      anchor("center"),
      pos(340, 0),
      opacity(0.5),
      area(),
      "right-button",
    ]);

    this.upButton = this.pad.add([
      rect(100, 200),
      anchor("center"),
      pos(180, -160),
      opacity(0.5),
      area(),
      "up-button",
    ]);

    this.downButton = this.pad.add([
      rect(100, 200),
      anchor("center"),
      pos(180, 160),
      opacity(0.5),
      area(),
      "down-button",
    ]);
  }
}
