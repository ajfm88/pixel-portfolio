import { PALETTE } from "../constants";

export default class Section {
  #isExpanded = false;

  constructor(posVec2, sectionName, onCollide) {
    this.gameObj = add([
      rect(200, 200),
      anchor("center"),
      area(),
      pos(posVec2),
      color(PALETTE.color1),
      sectionName,
    ]);

    this.gameObj.add([
      text(sectionName, { font: "ibm-bold", size: 64 }),
      color(PALETTE.color1),
      anchor("center"),
      pos(0, -150),
    ]);

    this.gameObj.onCollide("player", () => {
      if (!this.#isExpanded) {
        onCollide(this.gameObj);
        this.#isExpanded = true;
      }
    });
  }
}
