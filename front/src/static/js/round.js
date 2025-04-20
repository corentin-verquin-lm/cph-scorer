import "regenerator-runtime/runtime.js";
import Alpine from "alpinejs";
import RoundStore from "./store/round";
import { get } from "./util/client";
import { ROUND } from "./util/route";
import Match from "../../components/match/match";

window.Alpine = Alpine;

function loadStore() {
  RoundStore();
}

function loadComponent() {
  Match();
}

function loadPage() {
  Alpine.data("round", () => ({
    selectedRound: 1,
    numberTotalOfRound: 3,

    async init() {
      const data = await get(ROUND.READ(this.selectedRound));
      Alpine.store("RoundStore").create(data);
      document.querySelectorAll(".js-skeleton").forEach((x) => x.remove());
    },

    async changeSelected({ target }) {
      this.selectedRound = Number.parseInt(target.dataset.index);
      await this.init();
    },
  }));
}

document.addEventListener("alpine:init", () => {
  loadStore();
  loadComponent();
  loadPage();
});

Alpine.start();
