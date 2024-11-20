import { isAnyOfTheseKeysDown, playAnimIfNotPlaying } from "../utils.js";

export function generatePlayerComponents(k, pos) {
  return [
    k.sprite("assets", {
      anim: "player-idle-down",
    }),
    k.area({ shape: new k.Rect(k.vec2(2, 4), 12, 12) }),
    k.body(),
    k.pos(pos),
    k.health(6),
    {
      speed: 80,
    },
  ];
}

export function setPlayerControls(k, player) {
  k.onKeyDown("left", () => {
    if (isAnyOfTheseKeysDown(k, ["right", "up", "down"])) return;
    player.flipX = true;
    playAnimIfNotPlaying(player, "player-side");
    player.move(-player.speed, 0);
  });
  k.onKeyDown("right", () => {
    if (isAnyOfTheseKeysDown(k, ["left", "up", "down"])) return;
    player.flipX = false;
    playAnimIfNotPlaying(player, "player-side");
    player.move(player.speed, 0);
  });
  k.onKeyDown("up", () => {
    if (isAnyOfTheseKeysDown(k, ["left", "right", "down"])) return;
    playAnimIfNotPlaying(player, "player-up");
    player.move(0, -player.speed);
  });
  k.onKeyDown("down", () => {
    if (isAnyOfTheseKeysDown(k, ["left", "right", "up"])) return;
    playAnimIfNotPlaying(player, "player-down");
    player.move(0, player.speed);
  });

  k.onKeyRelease(() => {
    player.stop();
  });
}
