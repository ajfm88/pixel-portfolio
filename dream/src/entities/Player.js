import { DIAGONAL_FACTOR } from "../constants";
import {
  DPadInputAtom,
  isModalVisibleAtom,
  keyboardInputAtom,
  store,
} from "../store";

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

  window.addEventListener("keydown", (e) => {
    const keyboardInput = store.get(keyboardInputAtom);

    if (e.code === "KeyW" || e.code === "ArrowUp") {
      keyboardInput.isUpPressed = true;
    }

    if (e.code === "KeyS" || e.code === "ArrowDown") {
      keyboardInput.isDownPressed = true;
    }

    if (e.code === "KeyA" || e.code === "ArrowLeft") {
      keyboardInput.isLeftPressed = true;
    }

    if (e.code === "KeyD" || e.code === "ArrowRight") {
      keyboardInput.isRightPressed = true;
    }

    store.set(keyboardInputAtom, keyboardInput);
  });

  window.addEventListener("keyup", (e) => {
    const keyboardInput = store.get(keyboardInputAtom);

    if (e.code === "KeyW" || e.code === "ArrowUp") {
      keyboardInput.isUpPressed = false;
    }

    if (e.code === "KeyS" || e.code === "ArrowDown") {
      keyboardInput.isDownPressed = false;
    }

    if (e.code === "KeyA" || e.code === "ArrowLeft") {
      keyboardInput.isLeftPressed = false;
    }

    if (e.code === "KeyD" || e.code === "ArrowRight") {
      keyboardInput.isRightPressed = false;
    }

    store.set(keyboardInputAtom, keyboardInput);
  });

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

    if (player.direction.x && player.direction.y) {
      player.move(player.direction.scale(DIAGONAL_FACTOR * speed));
      return;
    }

    player.move(player.direction.scale(speed));
  });

  return player;
}
