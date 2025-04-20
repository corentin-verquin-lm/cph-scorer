/* global fetch */

import notification from "./notification";

const ENDPOINT = process.env.ENDPOINT;

function onResult(response) {
  if (response.status >= 400) {
    notification("danger", "Une erreur est survenue...");

    return "";
  } else {
    return response.json().catch(() => {});
  }
}

export async function get(url) {
  const response = await fetch(`${ENDPOINT}${url}`);
  return onResult(response);
}

export async function post(url, data) {
  const response = await fetch(`${ENDPOINT}${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return onResult(response);
}

export async function put(url, data) {
  const response = await fetch(`${ENDPOINT}${url}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return onResult(response);
}

export async function deleteApi(url) {
  const response = await fetch(`${ENDPOINT}${url}`, {
    method: "DELETE",
  });
  return onResult(response);
}
