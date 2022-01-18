const baseUrl = process.env.REACT_APP_API_URL;
export default function login({ email, password }) {
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}
