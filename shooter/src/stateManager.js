import k from "./kaplayCtx";

class GameStateManager {
  currentScore = 0;

  constructor() {
    this.gameObj = k.add([k.state("menu", ["menu", "cutscene", "game"])]);
  }
}

const gameStateManager = new GameStateManager();
export default gameStateManager;
