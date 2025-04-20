/* global Alpine */

import { get } from "../../static/js/util/client";
import { PLAYER } from "../../static/js/util/route";

export default function () {
  Alpine.data("register", () => ({
    async init() {
      const data = await get(PLAYER.READ_REGISTER);
      data
        .map((x) => `${x.firstName} - ${x.lastName}`)
        .forEach((x) => Alpine.store("RegisterStore").add(x));
    },
  }));
}
