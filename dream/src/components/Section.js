export default class Section {
  constructor(posVec2, sectionName) {
    this.gameObj = add([
      rect(200, 200),
      anchor("center"),
      area(),
      pos(posVec2),
      color(200, 0, 0),
      sectionName,
    ]);
  }
}
