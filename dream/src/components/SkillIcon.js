import makeIcon from "../components/Icon";
import { opacityTrickleDown } from "../utils";

export default function makeSkillIcon(k, parent, posVec2, imageData, subtitle) {
  const [icon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );

  opacityTrickleDown(parent, [subtitleText]);

  return icon;
}
