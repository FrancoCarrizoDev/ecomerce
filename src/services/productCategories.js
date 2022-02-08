const baseUrl = process.env.REACT_APP_API_URL;

export const getProductsCategories = async (method = "GET") => {
  const url = `${baseUrl}/categories`;

  const token = localStorage.getItem("token") || "";

  return fetch(url, {
    method,
    headers: {
      "x-token": token,
    },
  });
};
