import makeKaplayCtx from "./kaplayCtx";
import makePlayer from "./entities/Player";
import makeSection from "./components/Section";
import { PALETTE } from "./constants";
import makeLinkIcon from "./components/LinkIcon";

export default function initGame() {
  const k = makeKaplayCtx();
  k.loadFont("ibm-regular", "/fonts/IBMPlexSans-Regular.ttf");
  k.loadFont("ibm-bold", "/fonts/IBMPlexSans-Bold.ttf");
  k.loadSprite("github-logo", "/logos/github-logo.png");
  k.loadSprite("linkedin-logo", "/logos/linkedin-logo.png");
  k.loadSprite("youtube-logo", "/logos/youtube-logo.png");
  k.loadSprite("x-logo", "/logos/x-logo.png");
  k.loadSprite("substack-logo", "/logos/substack-logo.png");
  k.loadSprite("JavaScript-logo", "/logos/JavaScript-logo.png");
  k.loadShaderURL("tiledPattern", null, "/shaders/tiledPattern.frag");

  const tiledBackground = k.add([
    k.uvquad(k.width(), k.height()),
    k.shader("tiledPattern", () => ({
      u_time: k.time() / 20,
      u_color1: k.Color.fromHex(PALETTE.color3),
      u_color2: k.Color.fromHex(PALETTE.color2),
      u_speed: k.vec2(1, -1),
      u_angle: 45 / 2,
      u_scale: 4,
      u_aspect: k.width() / k.height(),
      u_size: 5,
    })),
    k.pos(0, 0),
    k.fixed(),
  ]);

  tiledBackground.onUpdate(() => {
    tiledBackground.width = k.width();
    tiledBackground.height = k.height();
    tiledBackground.uniform.u_aspect = k.width() / k.height();
  });

  makeSection(k, k.vec2(k.center().x, k.center().y - 400), "About", (root) => {
    const newComponent = root.add([
      k.text("Hi, I'm JSLegendDev!", { font: "ibm-bold", size: 88 }),
      k.color(k.Color.fromHex(PALETTE.color1)),
      k.pos(10, -500),
      k.opacity(0),
    ]);

    newComponent.add([
      k.text("A creative software developer", {
        font: "ibm-bold",
        size: 48,
      }),
      k.color(k.Color.fromHex(PALETTE.color1)),
      k.pos(5, 100),
      k.opacity(0),
    ]);

    makeLinkIcon(
      k,
      newComponent,
      k.vec2(300, 250),
      { name: "github-logo", width: 228.6, height: 179.5 },
      "GitHub",
      "https://github.com/jslegenddev"
    );

    k.tween(
      newComponent.opacity,
      1,
      0.5,
      (val) => {
        newComponent.opacity = val;
        for (const child of newComponent.children) {
          child.opacity = val;
        }
      },
      k.easings.linear
    );

    makeLinkIcon(
      k,
      newComponent,
      k.vec2(500, 250),
      {
        name: "linkedin-logo",
        width: 112,
        height: 100,
      },
      "Linkedin",
      "https://www.linkedin.com/in/js-legenddev-203368332/"
    );

    makeLinkIcon(
      k,
      newComponent,
      k.vec2(700, 250),
      {
        name: "youtube-logo",
        width: 160,
        height: 110,
      },
      "YouTube",
      "https://youtube.com/@jslegenddev"
    );

    makeLinkIcon(
      k,
      newComponent,
      k.vec2(900, 250),
      {
        name: "x-logo",
        width: 128,
        height: 128,
      },
      "X",
      "https://x.com/jslegenddev"
    );

    makeLinkIcon(
      k,
      newComponent,
      k.vec2(1100, 250),
      {
        name: "substack-logo",
        width: 128,
        height: 128,
      },
      "Substack",
      "https://jslegenddev.substack.com/"
    );

    newComponent.add([
      k.text("Contact : jslegend@protonmail.com", {
        font: "ibm-bold",
      }),
      k.color(k.Color.fromHex(PALETTE.color1)),
      k.pos(400, 500),
    ]);
  });
  makeSection(k, k.vec2(k.center().x, k.center().y + 400), "Projects");
  makeSection(k, k.vec2(k.center().x - 400, k.center().y), "Skills");
  makeSection(k, k.vec2(k.center().x + 400, k.center().y), "Work Experience");

  makePlayer(k, k.vec2(k.center()), 700);
}
