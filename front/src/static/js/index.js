require("dotenv").config();

import "regenerator-runtime/runtime.js";
import Alpine from "alpinejs";
import RegisterStore from "./store/register";
import RegisterInput from "../../components/register-input/register-input";
import Register from "../../components/register/register";
import { post, deleteApi } from "./util/client";
import { ROUND, TOURNAMENT } from "./util/route";
import notification from "./util/notification";

window.Alpine = Alpine;

function loadStore() {
  RegisterStore();
}

function loadComponent() {
  RegisterInput();
  Register();
}

function loadPage() {
  const NUMBER_OF_ROUND = 3;
  const NUMBER_OF_FIELD = 9;

  Alpine.data("index", () => ({
    buttonStartDisabled: false,
    buttonResetDisabled: false,

    async start() {
      this.buttonStartDisabled = true;
      await post(ROUND.CREATE(NUMBER_OF_ROUND,NUMBER_OF_FIELD), {});
      notification("success", "Parties correctement générés !");
      this.buttonStartDisabled = false;
    },

    async reset() {
      this.buttonResetDisabled = true;
      await deleteApi(TOURNAMENT.DELETE);
      location.reload();
    },
  }));
}

document.addEventListener("alpine:init", () => {
  loadStore();
  loadComponent();
  loadPage();
});

Alpine.start();
