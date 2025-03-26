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

    if (k.isButtonDown("left") || DPadInput.isLeftPressed)
      player.move(-speed, 0);
    if (k.isButtonDown("right") || DPadInput.isRightPressed)
      player.move(speed, 0);
    if (k.isButtonDown("up") || DPadInput.isUpPressed) player.move(0, -speed);
    if (k.isButtonDown("down") || DPadInput.isDownPressed)
      player.move(0, speed);
  });

  return player;
}
