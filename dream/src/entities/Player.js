import { DIAGONAL_FACTOR } from "../constants";
import {
  DPadInputAtom,
  isModalVisibleAtom,
  keyboardInputAtom,
  store,
} from "../store";

export default function makePlayer(k, posVec2, speed) {
  const player = k.add([
    k.sprite("player", { anim: "walk-down" }),
    k.scale(8),
    k.anchor("center"),
    k.area({ shape: new k.Rect(k.vec2(0), 5, 5) }),
    k.body(),
    k.pos(posVec2),
    "player",
    {
      direction: k.vec2(0, 0),
    },
  ]);

  player.onUpdate(() => {
    const DPadInput = store.get(DPadInputAtom);
    const keyboardInput = store.get(keyboardInputAtom);

    if (!k.camPos().eq(player.pos)) {
      k.tween(
        k.camPos(),
        player.pos,
        0.2,
        (newPos) => k.camPos(newPos),
        k.easings.linear
      );
    }

    if (store.get(isModalVisibleAtom)) {
      store.set(DPadInputAtom, {
        isLeftPressed: false,
        isRightPressed: false,
        isUpPressed: false,
        isDownPressed: false,
      });
      store.set(keyboardInputAtom, {
        isLeftPressed: false,
        isRightPressed: false,
        isUpPressed: false,
        isDownPressed: false,
      });
      return;
    }

    player.direction = k.vec2(0, 0);
    if (keyboardInput.isLeftPressed || DPadInput.isLeftPressed)
      player.direction.x = -1;
    if (keyboardInput.isRightPressed || DPadInput.isRightPressed)
      player.direction.x = 1;
    if (keyboardInput.isUpPressed || DPadInput.isUpPressed)
      player.direction.y = -1;
    if (keyboardInput.isDownPressed || DPadInput.isDownPressed)
      player.direction.y = 1;

    if (
      player.direction.eq(k.vec2(1, 0)) &&
      player.getCurAnim().name !== "walk-right"
    ) {
      player.play("walk-right");
    }

    if (
      player.direction.eq(k.vec2(-1, 0)) &&
      player.getCurAnim().name !== "walk-left"
    )
      player.play("walk-left");

    if (
      player.direction.eq(k.vec2(0, -1)) &&
      player.getCurAnim().name !== "walk-up"
    )
      player.play("walk-up");

    if (
      player.direction.eq(k.vec2(0, 1)) &&
      player.getCurAnim().name !== "walk-down"
    )
      player.play("walk-down");

    if (
      player.direction.eq(k.vec2(-1, -1)) &&
      player.getCurAnim().name !== "walk-left-up"
    )
      player.play("walk-left-up");

    if (
      player.direction.eq(k.vec2(-1, 1)) &&
      player.getCurAnim().name !== "walk-left-down"
    )
      player.play("walk-left-down");

    if (
      player.direction.eq(k.vec2(1, -1)) &&
      player.getCurAnim().name !== "walk-right-up"
    )
      player.play("walk-right-up");

    if (
      player.direction.eq(k.vec2(1, 1)) &&
      player.getCurAnim().name !== "walk-right-down"
    )
      player.play("walk-right-down");

    if (
      player.direction.eq(k.vec2(0, 0)) &&
      !player.getCurAnim().name.includes("idle")
    ) {
      player.play(`${player.getCurAnim().name}-idle`);
    }

    if (player.direction.x && player.direction.y) {
      player.move(player.direction.scale(DIAGONAL_FACTOR * speed));
      return;
    }

    player.move(player.direction.scale(speed));
  });

  return player;
}
