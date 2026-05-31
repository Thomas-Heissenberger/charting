export class DataProvider {
  constructor(type, data) {
    this.type = type;
    this.data = data;

    if (type === "mixed") {
      this.subscribeToLiveData();
      this.fetchHistoricData();
    } else if (type === "live") {
      this.subscribeToLiveData();
    } else if (type === "historic") {
      this.fetchHistoricData();
    }
  }

  subscribeToLiveData() {}

  fetchHistoricData() {}

  addData(newData) {
    this.data.push(newData);
    this.dispatchEvent(new Event("change"));
  }
}
