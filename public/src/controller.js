import * as echarts from "echarts";
import { chartOptions } from "./chartdefaults.js";
import { chartControl } from "./dataprovider.js";

let myChart = null;

async function changeTheme(selectedTheme) {
  if (selectedTheme !== null) {
    const theme = await fetch(`/themes/${selectedTheme}.json`).then(
      (response) => response.json(),
    );
    echarts.registerTheme(selectedTheme, theme);
  }

  if (myChart !== null) {
    window.removeEventListener("resize", handleResize);
    myChart.dispose();
  }

  const card = document.querySelector("main");

  myChart = echarts.init(document.getElementById("main"), selectedTheme);
  myChart.setOption(chartOptions);

  window.addEventListener("resize", handleResize);
}

function handleResize() {
  myChart.resize();
}

function getCurrentChart() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (myChart !== null) {
        clearInterval(interval);
        resolve(myChart);
      }
    }, 10); // check every 10ms
  });
}

window.addEventListener("load", async function () {
  const selectedTheme =
    document.getElementById("theme").value !== "default"
      ? document.getElementById("theme").value
      : null;

  await changeTheme(selectedTheme);

  chartControl.startLiveMode();
});

document
  .getElementById("theme")
  .addEventListener("change", async function (event) {
    const selectedTheme =
      event.target.value !== "default" ? event.target.value : null;

    await changeTheme(selectedTheme);
  });

document.getElementById("theme").addEventListener("wheel", function (event) {
  event.stopPropagation();

  if (event.deltaY > 0 && this.selectedIndex < this.options.length - 1) {
    this.selectedIndex += 1;
    this.dispatchEvent(new Event("change"));
  }

  if (event.deltaY < 0 && this.selectedIndex > 0) {
    this.selectedIndex -= 1;
    this.dispatchEvent(new Event("change"));
  }
});

document
  .getElementById("start-stop-btn")
  .addEventListener("click", function () {
    if (this.firstElementChild.classList.contains("fa-play")) {
      this.firstElementChild.classList.remove("fa-play");
      this.firstElementChild.classList.add("fa-stop");
      // Start data updates
      chartControl.startLiveMode();
    } else {
      this.firstElementChild.classList.remove("fa-stop");
      this.firstElementChild.classList.add("fa-play");
      // Stop data updates
      chartControl.stopLiveMode();
    }
  });

window.getConfig = function () {
  return myChart.getOption();
};

export { getCurrentChart };
