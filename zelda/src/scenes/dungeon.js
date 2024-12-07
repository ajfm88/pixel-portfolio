import {
  colorizeBackground,
  drawTiles,
  fetchMapData,
  drawBoundaries,
} from "../utils.js";

import {
  generatePlayerComponents,
  setPlayerControls,
} from "../entities/player.js";
import gameState from "../globalStateManager.js";

export default async function dungeon(k) {
  colorizeBackground(k, 27, 29, 52);
  const mapData = await fetchMapData("./assets/maps/dungeon.json");
  const map = k.add([k.pos(420, 95)]);

  const entities = {
    player: null,
  };

  const layers = mapData.layers;
  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      drawBoundaries(k, map, layer);
      continue;
    }

    if (layer.name === "SpawnPoints") {
      for (const object of layer.objects) {
        if (object.name === "player") {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
          continue;
        }
      }
      continue;
    }

    drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
  }

  setPlayerControls(k, entities.player);
  entities.player.onCollide("door-exit", () => {
    gameState.setPreviousScene("dungeon");
    k.go("world");
  });

  async function slideCamY(k, range, duration) {
    const currentCamPos = k.camPos();
    await k.tween(
      currentCamPos.y,
      currentCamPos.y + range,
      duration,
      (newPosY) => k.camPos(currentCamPos.x, newPosY),
      k.easings.linear
    );
  }

  entities.player.onCollide("door-entrance", async () => {
    await slideCamY(k, -180, 1);
    entities.player.pos.y -= 50;
  });

  entities.player.onCollide("door-exit-2", async () => {
    await slideCamY(k, 180, 1);
    entities.player.pos.y += 50;
  });

  k.camScale(4);
}
