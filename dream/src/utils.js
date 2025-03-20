export async function makeAppear(k, gameObj) {
  await k.tween(
    gameObj.opacity,
    1,
    0.5,
    (val) => {
      gameObj.opacity = val;
    },
    k.easings.linear
  );

  if (gameObj.opacityTrickleDown) gameObj.opacityTrickleDown.cancel();
}
