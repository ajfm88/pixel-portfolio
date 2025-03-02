import { PALETTE } from "../constants";

export default function makeSection(k, posVec2, sectionName, onCollide = null) {
  let isExpanded = false;

  const section = k.add([
    k.rect(200, 200),
    k.anchor("center"),
    k.area(),
    k.pos(posVec2),
    k.color(PALETTE.color1),
    sectionName,
  ]);

  section.add([
    k.text(sectionName, { font: "ibm-bold", size: 64 }),
    k.color(PALETTE.color1),
    k.anchor("center"),
    k.pos(0, -150),
  ]);

  if (onCollide)
    section.onCollide("player", () => {
      if (!isExpanded) {
        onCollide(section);
        isExpanded = true;
      }
    });

  return section;
}
