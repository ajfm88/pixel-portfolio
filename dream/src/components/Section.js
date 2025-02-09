import { PALETTE } from "../constants";

export default class Section {
  constructor(posVec2, sectionName) {
    this.gameObj = add([
      rect(200, 200),
      anchor("center"),
      area(),
      pos(posVec2),
      color(PALETTE.color1),
      sectionName,
    ]);

    this.gameObj.add([
      text(sectionName, { font: "mania", size: 64 }),
      color(PALETTE.color1),
      anchor("center"),
      pos(0, -150),
    ]);
  }
}
