import { DIAGONAL_FACTOR } from "../constants";
import { DPadInputAtom, isModalVisibleAtom, store } from "../state";

export default function makePlayer(k, posVec2, speed) {
  const player = k.add([
    k.rect(60, 60),
    k.anchor("center"),
    k.area(),
    k.outline(6),
    k.body(),
    k.pos(posVec2),
    "player",
    {
      direction: k.vec2(0, 0),
    },
  ]);

  player.onUpdate(() => {
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
      return;
    }

    const DPadInput = store.get(DPadInputAtom);

    player.direction = k.vec2(0, 0);
    if (k.isButtonDown("left") || DPadInput.isLeftPressed)
      player.direction.x = -1;
    if (k.isButtonDown("right") || DPadInput.isRightPressed)
      player.direction.x = 1;
    if (k.isButtonDown("up") || DPadInput.isUpPressed) player.direction.y = -1;
    if (k.isButtonDown("down") || DPadInput.isDownPressed)
      player.direction.y = 1;

    if (player.direction.x && player.direction.y) {
      player.move(player.direction.scale(DIAGONAL_FACTOR * speed));
      return;
    }

    player.move(player.direction.scale(speed));
  });

  return player;
}
