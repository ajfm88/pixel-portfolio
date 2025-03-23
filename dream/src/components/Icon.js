import { PALETTE } from "../constants";
import { isModalVisibleAtom, selectedLinkAtom, store } from "../state";
import { opacityTrickleDown } from "../utils";

export default function makeIcon(
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
  link = null
) {
  const linkIcon = parent.add([
    k.sprite(imageData.name, {
      width: imageData.width,
      height: imageData.height,
    }),
    k.anchor("center"),
    k.pos(posVec2),
    k.opacity(0),
  ]);

  const subtitleText = linkIcon.add([
    k.text(subtitle, { font: "ibm-bold", size: 32 }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.pos(0, 100),
    k.opacity(0),
  ]);

  let linkSwitch;
  if (link) {
    linkSwitch = linkIcon.add([
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
  }

  opacityTrickleDown(
    parent,
    linkSwitch ? [subtitleText, linkSwitch] : [subtitleText]
  );

  return linkIcon;
}
