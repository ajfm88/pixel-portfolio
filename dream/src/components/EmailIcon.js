import { PALETTE } from "../constants";
import { opacityTrickleDown } from "../utils";
import makeIcon from "./Icon";

export default function makeEmailIcon(
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
  address
) {
  const [emailIcon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );

  const emailSwitch = emailIcon.add([
    k.circle(30),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.area(),
    k.pos(0, 150),
  ]);

  emailSwitch.onCollide("player", () => {
    console.log(address);
  });

  opacityTrickleDown(parent, [subtitleText, emailSwitch]);

  return emailIcon;
}
