import makeKaplayCtx from "./kaplayCtx";
import makePlayer from "./entities/Player";
import makeSection from "./components/Section";
import { PALETTE } from "./constants";
import makeSocialIcon from "./components/SocialIcon";
import makeSkillIcon from "./components/SkillIcon";
import { makeAppear } from "./utils";
import makeWorkExperienceCard from "./components/WorkExperienceCard";
import makeEmailIcon from "./components/EmailIcon";
import makeProjectCard from "./components/ProjectCard";
import { cameraZoomValueAtom, store } from "./state";

export default async function initGame() {
  const generalData = await (await fetch("/configs/generalData.json")).json();
  const skillsData = await (await fetch("/configs/skillsData.json")).json();
  const socialsData = await (await fetch("/configs/socialsData.json")).json();
  const experiencesData = await (
    await fetch("/configs/experiencesData.json")
  ).json();

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
  k.loadSprite("email-logo", "/logos/email-logo.png");
  k.loadSprite("sonic-js", "/projects/sonic-js.png");
  k.loadSprite("kirby-ts", "/projects/kirby-ts.png");
  k.loadSprite("platformer-js", "/projects/platformer-js.png");
  k.loadShaderURL("tiledPattern", null, "/shaders/tiledPattern.frag");

  const setInitCamZoomValue = () => {
    if (k.width() < 1000) {
      k.camScale(k.vec2(0.5));
      store.set(cameraZoomValueAtom, 0.5);
      return;
    }
    k.camScale(k.vec2(0.8));
    store.set(cameraZoomValueAtom, 0.8);
  };
  setInitCamZoomValue();

  const cameraZoomValue = store.get(cameraZoomValueAtom);
  store.set(cameraZoomValueAtom, 0.75);
  k.onUpdate(() => {
    console.log(cameraZoomValue);
    if (cameraZoomValue !== k.camScale().x) k.camScale(k.vec2(cameraZoomValue));
  });

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
    generalData.section1Name,
    (parent) => {
      const container = parent.add([k.pos(-805, -700), k.opacity(0)]);

      container.add([
        k.text(generalData.header.title, { font: "ibm-bold", size: 88 }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(395, 0),
        k.opacity(0),
      ]);

      container.add([
        k.text(generalData.header.subtitle, {
          font: "ibm-bold",
          size: 48,
        }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(485, 100),
        k.opacity(0),
      ]);

      const socialContainer = container.add([k.pos(50, 0), k.opacity(0)]);

      for (const socialData of socialsData) {
        if (socialData.name === "Email") {
          makeEmailIcon(
            k,
            socialContainer,
            k.vec2(1300, 250),
            socialData.logoData,
            socialData.name,
            socialData.address
          );
          continue;
        }

        makeSocialIcon(
          k,
          socialContainer,
          k.vec2(socialData.pos.x, socialData.pos.y),
          socialData.logoData,
          socialData.name,
          socialData.link,
          socialData.description
        );
      }

      makeAppear(k, container);
      makeAppear(k, socialContainer);
    }
  );
  makeSection(
    k,
    k.vec2(k.center().x - 400, k.center().y),
    generalData.section2Name,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(-300, 0)]);

      for (const skillData of skillsData) {
        makeSkillIcon(
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
    generalData.section3Name,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0)]);
      for (const experienceData of experiencesData) {
        makeWorkExperienceCard(
          k,
          container,
          k.vec2(experienceData.pos.x, experienceData.pos.y),
          experienceData.cardHeight,
          experienceData.roleData
        );
      }

      makeAppear(k, container);
    }
  );
  makeSection(
    k,
    k.vec2(k.center().x, k.center().y + 400),
    generalData.section4Name,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0, 0)]);
      makeProjectCard(
        k,
        container,
        k.vec2(0, 350),
        "JavaScript Sonic Themed Infinite Runnner Game",
        "sonic-js"
      );

      makeProjectCard(
        k,
        container,
        k.vec2(0, 840),
        "TypeScript Kirby-like Game",
        "kirby-ts"
      );

      makeProjectCard(
        k,
        container,
        k.vec2(0, 1320),
        "JavaScript Platformer Game",
        "platformer-js"
      );

      makeAppear(k, container);
    }
  );

  makePlayer(k, k.vec2(k.center()), 700);
}
