import { DataProvider } from "./base.js";

export class MockDataProvider extends DataProvider {
  constructor(type, data, numberOfSeries = 1) {
    super(type, data);
    this.oneDay = 24 * 3600 * 1000;
    this.base = new Date(2014, 9, 12).getTime() - 7 * this.oneDay;
    this.data = data;
    this.now = new Date(this.base);
    this.series = [];

    for (let i = 0; i < numberOfSeries; i++) {
      this.series.push({
        name: `Series ${i + 1}`,
        type: "line",
        data: data[i] || [],
      });
    }
  }

  subscribeToLiveData() {
    super.subscribeToLiveData();
    console.log("Subscribed to live Mock data");

    setInterval(() => {
      const dateString = [
        this.now.getFullYear(),
        this.now.getMonth() + 1,
        this.now.getDate(),
      ].join("/");

      for (let series of this.series) {
        series.data.push([dateString, (Math.random() * 150).toFixed(2)]);
      }

      this.now = new Date(this.now.getTime() + this.oneDay);
    }, 500);
  }

  fetchHistoricData() {
    super.fetchHistoricData();
    console.log("Fetching historic Mock data");
  }
}
