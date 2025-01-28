import kaplay from "kaplay";
import "kaplay/global";
import Player from "./entities/Player";
import Section from "./components/Section";

kaplay({});

scene("is-on-mobile", () => {
  add([
    text("Are you viewing this portfolio on mobile?"),
    anchor("center"),
    pos(center()),
  ]);
});

scene("portfolio-land", () => {
  new Section(vec2(center().x, center().y - 300));
  new Section(vec2(center().x, center().y + 300));
  new Section(vec2(center().x - 300, center().y));
  new Section(vec2(center().x + 300, center().y));

  const player = new Player(vec2(center()), 300);
});

go("is-on-mobile");
