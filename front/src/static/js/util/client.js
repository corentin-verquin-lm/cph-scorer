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

async function fetchWithRetry(url, options = {}, retries = 3, delay = 500) {
  try {
    const response = await fetch(url, options);
    if (!response.ok && retries > 0) {
      await new Promise(res => setTimeout(res, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    return response;
  } catch (err) {
    if (retries > 0) {
      await new Promise(res => setTimeout(res, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw err;
  }
}


export async function get(url) {
  const response = await fetchWithRetry(`${ENDPOINT}${url}`);
  return onResult(response);
}

export async function post(url, data) {
  const response = await fetchWithRetry(`${ENDPOINT}${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return onResult(response);
}

export async function put(url, data) {
  const response = await fetchWithRetry(`${ENDPOINT}${url}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return onResult(response);
}

export async function deleteApi(url) {
  const response = await fetchWithRetry(`${ENDPOINT}${url}`, {
    method: "DELETE",
  });
  return onResult(response);
}
