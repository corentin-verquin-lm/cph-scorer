import "regenerator-runtime/runtime.js";
import Alpine from "alpinejs";
import { get } from "./util/client";
import { RANKING } from "./util/route";

window.Alpine = Alpine;

function loadPage() {
  Alpine.data("ranking", () => ({
    rankinType: [],
    selectedRanking: "",
    rankings: [],

    async init() {
      this.rankinType = await get(RANKING.READTYPE);
      this.selectedRanking = this.rankinType[0];
      await this.loadData();
    },

    async loadData() {
      this.rankings = await get(RANKING.READ(this.selectedRanking));
    },

    async changeSelected({ target }) {
      this.selectedRanking = target.dataset.index;
      await this.loadData();
    },
  }));
}

document.addEventListener("alpine:init", () => {
  loadPage();
});

Alpine.start();
