class DataManager {
  #deviceType = "desktop";

  set deviceType(type) {
    const possibleTypes = ["mobile-vertical", "mobile-horizontal", "desktop"];
    if (!possibleTypes.includes(type)) {
      throw Error("Device type passed does not exist!");
    }

    this.#deviceType = type;
  }

  get deviceType() {
    return this.#deviceType;
  }
}

const dataManager = new DataManager();

export default dataManager;
