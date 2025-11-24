import k from "./kaplayCtx";

class GameManager {
  currentScore = 0;
  currentRoundNb = 0;
  currentHuntNb = 0;
  nbBulletsLeft = 3;
  nbDucksShotInRound = 0;
  preySpeed = 100;

  constructor() {
    this.stateMachine = k.add([
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
