import { API_URL, STRAPI_API_TOKEN, BEARER } from "./constants";
import { getToken } from "./helpers";

const token = getToken();

export const fetcher = async (endpoint) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `${BEARER} ${STRAPI_API_TOKEN}`,
    },
    next: { revalidate: 1000 },
  };

  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await res.json();

  return data;
};

export const fetchUser = async () => {
  const res = await fetch(`${API_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Authorization: `${BEARER} ${token}`,
    },
  });
  const data = await res.json();

  return data;
};

export const makePaymentRequest = async (endpoint, payload) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `${BEARER} ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
