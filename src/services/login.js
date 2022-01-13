const ENDPOINT = "http://localhost:8080/api/auth";

export default function login({ email, password }) {
  return fetch(`${ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}
