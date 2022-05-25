import useToken from "@/composable/auth/useToken";
import { acceptHMRUpdate, createPinia, defineStore } from "pinia";
import { callMsGraph } from "./MsGraphApiCall";
import { masterTables } from "./sources/masterTables";
export const pinia = createPinia();

export interface State {
  userData: any;
  masterTables: Object;
}
export const useShellStore = defineStore<string, State>("storeId", {
  state: () => {
    return {
      userData: {},
      masterTables,
    };
  },
  getters: {
    getMasterTable: (state) => {
      return (name: string) => {
        return [...state.masterTables[name]];
      };
    },
  },
  actions: {
    async getUserData() {
      const { getAccessToken } = useToken();
      const response = await getAccessToken();
      const graphData = await callMsGraph(response.accessToken);
      this.userData = graphData;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useShellStore, import.meta.hot));
}
