export default function (event) {
  const form = event.target.closest("form");

  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  form.classList.add("was-validated");
}
