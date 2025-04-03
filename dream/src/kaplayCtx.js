import kaplay from "kaplay";

export default function makeKaplayCtx() {
  return kaplay({
    global: false,
    pixelDensity: devicePixelRatio,
    touchToMouse: true,
    debug: true, // TODO: set this back to false in prod
    debugKey: "f1",
  });
}
