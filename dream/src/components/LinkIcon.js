import { PALETTE } from "../constants";
import { isVisibleAtom, selectedLinkAtom, store } from "../state";

export default class LinkIcon {
  constructor(root, posVec2, imageData, subtitle, link) {
    this.root = root;
    this.logo = root.add([
      sprite(imageData.name, {
        width: imageData.width,
        height: imageData.height,
      }),
      anchor("center"),
      pos(posVec2),
    ]);

    this.logo.add([
      text(subtitle, { font: "ibm-bold", size: 32 }),
      color(Color.fromHex(PALETTE.color1)),
      anchor("center"),
      pos(0, 100),
    ]);

    this.switch = this.logo.add([
      rect(60, 60),
      color(Color.fromHex(PALETTE.color1)),
      anchor("center"),
      area(),
      pos(0, 150),
    ]);

    this.setOpenLinkHandler(link);
  }

  setOpenLinkHandler(link) {
    this.switch.onCollide("player", (player) => {
      store.set(isVisibleAtom, true);
      store.set(selectedLinkAtom, link);
    });
  }
}
