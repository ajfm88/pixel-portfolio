import k from "./kaplayCtx";

class GameManager {
  currentScore = 0;
  currentRoundNb = 1;
  currentHuntNb = 0;

  constructor() {
    this.state = k.add([
      k.state("menu", [
        "menu",
        "cutscene",
        "round-start",
        "round-end",
        "hunt-start",
        "hunt-end",
        "duck-hunted",
        "duck-escaped",
      ]),
    ]);
  }
}

const gameManager = new GameManager();
export default gameManager;
