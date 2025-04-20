/* global Alpine */
/* global FormData */
/* global localStorage */

import { Modal } from "bootstrap";
import { put } from "../../static/js/util/client";
import valid from "../../static/js/util/form";
import { MATCH } from "../../static/js/util/route";

export default function () {
  Alpine.data("match", () => ({
    area: [1, 3, 6, 8, 2, 4, 5, 7, 9],
    modal: new Modal(document.querySelector(".js-modal-score")),
    currentMatch: { teamOne: [], teamTwo: [] },

    setScore({ target }) {
      const id = target.closest(".match").dataset.id;

      Alpine.store("RoundStore").round.matchs.forEach((x) => {
        if (x.id === id) {
          this.currentMatch = x;
        }
      });
      this.modal.show();
    },

    async submitScore(event) {
      event.preventDefault();

      const data = new FormData(event.target);

      this.currentMatch.teamOne.score = data.get("score1");
      this.currentMatch.teamTwo.score = data.get("score2");

      await put(MATCH.UPDATE, {
        match: this.currentMatch,
        type: localStorage.rankingType,
      });

      event.target.querySelectorAll("input").forEach((input) => {
        input.value = "";
      });
      event.target.classList.remove("was-validated");

      this.modal.hide();
    },

    valid,
  }));
}
