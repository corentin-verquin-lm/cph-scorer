/* global Alpine */
/* global FormData */
/* global localStorage */

import valid from "../../static/js/util/form";
import { get, post } from "../../static/js/util/client";
import { PLAYER, RANKING } from "../../static/js/util/route";
import { Modal } from "bootstrap";

function clear(input) {
  input.value = "";
}

export default function () {
  Alpine.data("registerInput", () => ({
    player: [],
    rankingType: [],
    modal: new Modal(document.querySelector(".js-modal-add")),

    async init() {
      this.rankingType = await get(RANKING.READTYPE);
      const data = await get(PLAYER.READ);
      this.player.push(...data);
      document.querySelectorAll(".js-skeleton").forEach((x) => x.remove());
      document
        .querySelectorAll(".js-skeleton-show.d-none")
        .forEach((x) => x.classList.remove("d-none"));
    },

    async submit(event) {
      event.preventDefault();

      const data = new FormData(event.target);
      const id = event.target.querySelector(
        `option[value="${data.get("player")}"]`
      )?.dataset.id;

      if (id) {
        await post(PLAYER.CREATE_REGISTER, {
          id,
          type: data.get("rankingType"),
        });

        localStorage.setItem("rankingType", data.get("rankingType"));
        Alpine.store("RegisterStore").add(data.get("player"));
        event.target.classList.remove("was-validated");

        clear(event.target.querySelector('input[name="player"]'));
      } else {
        this.modal.show();
      }
    },

    async addPlayer(event) {
      event.preventDefault();

      const data = new FormData(event.target);
      const form = document.querySelector("form.js-register-form");

      const res = await post(PLAYER.CREATE, {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
      });
      this.player.push(res);

      const type = new FormData(form).get("rankingType");
      await post(PLAYER.CREATE_REGISTER, { id: res.id, type });

      localStorage.setItem("rankingType", type);

      form.classList.remove("was-validated");
      clear(form.querySelector('input[name="player"]'));

      Alpine.store("RegisterStore").add(`${res.firstName} - ${res.lastName}`);
      event.target.classList.remove("was-validated");
      event.target.querySelectorAll("input").forEach((x) => clear(x));

      this.modal.hide();
    },

    valid,
  }));
}
