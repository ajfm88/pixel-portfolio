import { PALETTE } from "../constants";
import {
  isModalVisibleAtom,
  selectedLinkAtom,
  selectedLinkDescriptionAtom,
  store,
} from "../store";
import { opacityTrickleDown } from "../utils";
import makeIcon from "./Icon";

export default function makeSocialIcon(
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
  link,
  description
) {
  const [socialIcon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );

  const linkSwitch = socialIcon.add([
    k.circle(30),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.area(),
    k.pos(0, 150),
  ]);

  linkSwitch.onCollide("player", () => {
    store.set(isModalVisibleAtom, true);
    store.set(selectedLinkAtom, link);
    store.set(selectedLinkDescriptionAtom, description);
  });

  opacityTrickleDown(parent, [subtitleText, linkSwitch]);

  return socialIcon;
}
