const baseUrl = process.env.REACT_APP_API_URL

export default function createUser(newUser) {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
}
