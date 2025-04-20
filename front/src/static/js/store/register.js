/* global Alpine */

export default function () {
  Alpine.store("RegisterStore", {
    init() {
      this._player = new Set();
    },
    add(data) {
      this._player.add(data);
    },
    get player() {
      return Array.from(this._player);
    },
  });
}
