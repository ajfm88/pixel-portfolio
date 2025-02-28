import { PALETTE } from "../constants";
import { isModalVisibleAtom, selectedLinkAtom, store } from "../state";

export default function makeLinkIcon(
  k,
  root,
  posVec2,
  imageData,
  subtitle,
  link
) {
  const linkIcon = root.add([
    k.sprite(imageData.name, {
      width: imageData.width,
      height: imageData.height,
    }),
    k.anchor("center"),
    k.pos(posVec2),
  ]);

  linkIcon.add([
    k.text(subtitle, { font: "ibm-bold", size: 32 }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.pos(0, 100),
  ]);

  const linkSwitch = linkIcon.add([
    k.rect(60, 60),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.area(),
    k.pos(0, 150),
  ]);

  linkSwitch.onCollide("player", () => {
    store.set(isModalVisibleAtom, true);
    store.set(selectedLinkAtom, link);
  });

  return linkIcon;
}
