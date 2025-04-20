/* global Alpine */

export default function () {
  Alpine.store("RoundStore", {
    init() {
      this.round = {};
    },
    create(round) {
      this.round = { ...round };
    },
  });
}
