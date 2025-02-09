import { PALETTE } from "../constants";

export default function makeTiledBackground(width, height, color) {
  return add([
    uvquad(width, height),
    shader("tiledPattern", () => ({
      u_time: time() / 20,
      u_color1: Color.fromHex(PALETTE.color3),
      u_color2: Color.fromHex(PALETTE.color2),
      u_speed: vec2(1, -1),
      u_angle: 45 / 2,
      u_scale: 4,
      u_aspect: width / height,
    })),
    pos(0, 0),
    fixed(),
  ]);
}
