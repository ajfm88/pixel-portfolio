export function makeAppear(k, gameObj) {
  k.tween(
    gameObj.opacity,
    1,
    0.5,
    (val) => {
      gameObj.opacity = val;
      for (const child of gameObj.children) {
        child.opacity = val;
      }
    },
    k.easings.linear
  );
}
