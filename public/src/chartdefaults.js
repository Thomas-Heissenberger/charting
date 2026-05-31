const chartOptions = {
  title: {
    text: "ECharts Getting Started Example",
  },
  animation: false,
  // animationDuration: 100,
  // animationDurationUpdate: 100,
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
    position: function (point, params, dom, rect, size) {
      // fixed at top
      return ["87%", "10%"];
    },
  },
  axisPointer: {
    show: true,
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    boundaryGap: false,
    //  data: ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"],
  },
  yAxis: {
    boundaryGap: [0, "15%"],
  },
  series: [],
};

export { chartOptions };
