import { DataProvider } from "./base.js";

export class SQLDataProvider extends DataProvider {
  subscribeToLiveData() {
    super.subscribeToLiveData();
    console.log("Live Data not available for SQL data provider");
  }
  fetchHistoricData() {
    super.fetchHistoricData();
    console.log("Fetching historic SQL data");
  }
}
