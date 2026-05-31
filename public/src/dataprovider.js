import * as echarts from "echarts";
import { getCurrentChart } from "./controller.js";
import { MockDataProvider } from "./datasources/index.js";

let interval = null;

let chartControl = {
  startLiveMode() {
    interval = setInterval(async () => {
      let chart = await getCurrentChart();
      let now = Date.now();
      let oneDay = 24 * 3600 * 1000;
      let maxTime = new Date(dataProvider.series[0].data.at(-1)[0]);
      chart.setOption({
        xAxis: {
          min: maxTime - 15 * 15 * oneDay,
          max: maxTime,
          axisPointer: {
            show: true,
          },
          type: "time",
        },
        yAxis: {
          type: "value",
        },
        series: dataProvider.series,
      });
    }, 50);
  },
  stopLiveMode() {
    if (interval) {
      clearInterval(interval);
    }
  },
};

const dataProvider = new MockDataProvider("live", [], 3);

export { chartControl, dataProvider };
