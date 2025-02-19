import kaplay from "kaplay";
import "kaplay/global";
import Player from "./entities/Player";
import Section from "./components/Section";
import { PALETTE } from "./constants";
import LinkIcon from "./components/LinkIcon";

export default function initGame() {
  const canvas = kaplay({
    pixelDensity: devicePixelRatio,
    touchToMouse: true,
    debug: true, // TODO: set this back to false in prod
    debugKey: "f1",
    buttons: {
      left: {
        keyboard: ["a", "left"],
      },
      right: {
        keyboard: ["d", "right"],
      },
      up: {
        keyboard: ["w", "up"],
      },
      down: {
        keyboard: ["s", "down"],
      },
    },
  });
  loadFont("mania", "/fonts/mania.ttf");
  loadFont("inter", "/fonts/inter.ttf");
  loadFont("ibm-regular", "/fonts/IBMPlexSans-Regular.ttf");
  loadFont("ibm-bold", "/fonts/IBMPlexSans-Bold.ttf");

  loadSprite("github-logo", "/logos/github-logo.png");

  loadShaderURL("tiledPattern", null, "/shaders/tiledPattern.frag");

  scene("portfolio-land", () => {
    const tiledBackground = add([
      uvquad(canvas.width(), canvas.height()),
      shader("tiledPattern", () => ({
        u_time: time() / 20,
        u_color1: Color.fromHex(PALETTE.color3),
        u_color2: Color.fromHex(PALETTE.color2),
        u_speed: vec2(1, -1),
        u_angle: 45 / 2,
        u_scale: 4,
        u_aspect: canvas.width() / canvas.width(),
      })),
      pos(0, 0),
      fixed(),
    ]);

    tiledBackground.onUpdate(() => {
      tiledBackground.width = canvas.width();
      tiledBackground.height = canvas.height();
      tiledBackground.uniform.u_aspect = canvas.width() / canvas.height();
    });

    new Section(vec2(center().x, center().y - 400), "About", (root) => {
      const newComponent = root.add([
        text("Hi, I'm JSLegendDev!", { font: "ibm-bold", size: 88 }),
        color(Color.fromHex(PALETTE.color1)),
        pos(10, -500),
        opacity(0),
      ]);

      newComponent.add([
        text("A creative software developer", {
          font: "ibm-bold",
          size: 48,
        }),
        color(Color.fromHex(PALETTE.color1)),
        pos(5, 100),
        opacity(0),
      ]);

      new LinkIcon(
        newComponent,
        vec2(300, 250),
        { name: "github-logo", width: 228.6, height: 179.5 },
        "GitHub",
        "https://github.com/jslegenddev"
      );

      tween(
        newComponent.opacity,
        1,
        0.5,
        (val) => {
          newComponent.opacity = val;
          for (const child of newComponent.children) {
            child.opacity = val;
          }
        },
        easings.linear
      );
    });
    new Section(vec2(center().x, center().y + 400), "Projects");
    new Section(vec2(center().x - 400, center().y), "Skills");
    new Section(vec2(center().x + 400, center().y), "Work Experience");

    const player = new Player(vec2(center()), 700);
    player.setControls();
  });

  go("portfolio-land");
}
