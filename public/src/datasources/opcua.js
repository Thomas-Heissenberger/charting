import { DataProvider } from "./base.js";

export class OPCUADataProvider extends DataProvider {
  subscribeToLiveData() {
    super.subscribeToLiveData();
    console.log("Subscribed to live OPC UA data");
  }
  fetchHistoricData() {
    super.fetchHistoricData();
    console.log("Fetching historic OPC UA data");
  }
}
