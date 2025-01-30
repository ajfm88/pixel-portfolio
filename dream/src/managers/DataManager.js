class DataManager {
  setIsMobile(boolean) {
    this.isMobile = boolean;
  }

  get(property) {
    if (!this[property]) {
      throw Error("Data property doesn't exist!");
    }

    return this[property];
  }
}

const dataManager = new DataManager();

export default dataManager;
