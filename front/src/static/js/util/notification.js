/* global DOMParser */

export default function (type, text) {
  const notification = new DOMParser().parseFromString(
    `
            <div class="alert alert-${type} fixed-bottom mx-4" role="alert" style="left:unset">
                ${text}
            </div>
        `,
    "text/html"
  ).body.firstChild;

  document
    .querySelector(".container")
    .insertAdjacentElement("beforeend", notification);

  setTimeout(() => {
    document.querySelector(".container").removeChild(notification);
  }, 3000);
}
