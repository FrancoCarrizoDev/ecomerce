const baseUrl = process.env.REACT_APP_API_URL;

export const fetchWithToken = async (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};
