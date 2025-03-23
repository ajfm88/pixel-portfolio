import makeKaplayCtx from "./kaplayCtx";
import makePlayer from "./entities/Player";
import makeSection from "./components/Section";
import { PALETTE } from "./constants";
import makeIcon from "./components/Icon";
import { makeAppear } from "./utils";
import makeWorkExperienceCard from "./components/WorkExperienceCard";

export default async function initGame() {
  const skillsData = await (await fetch("/configs/skillsData.json")).json();
  const socialsData = await (await fetch("/configs/socialsData.json")).json();

  const k = makeKaplayCtx();
  k.loadFont("ibm-regular", "/fonts/IBMPlexSans-Regular.ttf");
  k.loadFont("ibm-bold", "/fonts/IBMPlexSans-Bold.ttf");
  k.loadSprite("github-logo", "/logos/github-logo.png");
  k.loadSprite("linkedin-logo", "/logos/linkedin-logo.png");
  k.loadSprite("youtube-logo", "/logos/youtube-logo.png");
  k.loadSprite("x-logo", "/logos/x-logo.png");
  k.loadSprite("substack-logo", "/logos/substack-logo.png");
  k.loadSprite("javascript-logo", "/logos/javascript-logo.png");
  k.loadSprite("typescript-logo", "/logos/typescript-logo.png");
  k.loadSprite("react-logo", "/logos/react-logo.png");
  k.loadSprite("nextjs-logo", "/logos/nextjs-logo.png");
  k.loadSprite("postgres-logo", "/logos/postgres-logo.png");
  k.loadSprite("html-logo", "/logos/html-logo.png");
  k.loadSprite("css-logo", "/logos/css-logo.png");
  k.loadSprite("tailwind-logo", "/logos/tailwind-logo.png");
  k.loadSprite("python-logo", "/logos/python-logo.png");
  k.loadShaderURL("tiledPattern", null, "/shaders/tiledPattern.frag");

  k.camScale(k.vec2(k.width() < 1000 ? 0.5 : 0.8));

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

  makeSection(
    k,
    k.vec2(k.center().x, k.center().y - 400),
    "About",
    (parent) => {
      const container = parent.add([
        k.text("Hi, I'm JSLegendDev!", { font: "ibm-bold", size: 88 }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(10, -500),
        k.opacity(0),
      ]);

      container.add([
        k.text("A creative software developer", {
          font: "ibm-bold",
          size: 48,
        }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(5, 100),
        k.opacity(0),
      ]);

      for (const socialData of socialsData) {
        makeIcon(
          k,
          container,
          k.vec2(socialData.pos.x, socialData.pos.y),
          socialData.logoData,
          socialData.name,
          socialData.link
        );
      }

      container.add([
        k.text("Email : jslegend@protonmail.com", {
          font: "ibm-bold",
        }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(400, 500),
        k.opacity(0),
      ]);

      makeAppear(k, container);
    }
  );
  makeSection(k, k.vec2(k.center().x, k.center().y + 400), "Projects");
  makeSection(
    k,
    k.vec2(k.center().x - 400, k.center().y),
    "Skills",
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(-300, 0)]);

      for (const skillData of skillsData) {
        makeIcon(
          k,
          container,
          k.vec2(skillData.pos.x, skillData.pos.y),
          skillData.logoData,
          skillData.name
        );
      }

      makeAppear(k, container);
    }
  );
  makeSection(
    k,
    k.vec2(k.center().x + 400, k.center().y),
    "Work Experience",
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0)]);
      makeWorkExperienceCard(k, container, k.vec2(150, -100), {
        title: "Front-End Software Engineer",
        description:
          "Enhanced [REDACTED]'s interactive design platform by building and optimizing prototyping tools, empowering designers to create high-fidelity experiences and bridging the gap between design and development.",
        company: {
          name: "[REDACTED]",
          startDate: "2024",
          endDate: "Present",
        },
      });
      makeWorkExperienceCard(k, container, k.vec2(150, 180), {
        title: "Product Software Engineer",
        description:
          "Improved [REDACTED]'s real-time design collaboration tool by developing new components and refining existing features, enhancing workflow efficiency and creativity for design teams worldwide.",
        company: {
          name: "[REDACTED]",
          startDate: "2021",
          endDate: "2023",
        },
      });

      makeAppear(k, container);
    }
  );

  makePlayer(k, k.vec2(k.center()), 700);
}
