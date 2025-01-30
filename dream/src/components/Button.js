export default class Button {
  constructor(posVec2, value) {
    this.gameObj = add([
      rect(300, 100, { radius: 64 }),
      outline(3),
      anchor("center"),
      area(),
      pos(posVec2),
    ]);
    this.gameObj.add([
      text(value, { font: "mania" }),
      anchor("center"),
      color(0, 0, 0),
    ]);
  }

  handleOnClick(onClickLogic) {
    this.gameObj.onClick(async () => {
      this.gameObj.color = rgb(173, 216, 230);
      await wait(0.2);
      onClickLogic();
    });
  }
}
