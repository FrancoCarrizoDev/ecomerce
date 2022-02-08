const baseUrl = process.env.REACT_APP_API_URL;

// TODO para los gets no hace falta enviar el token

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

export const getProductValuesCategories = async (id) => {
  const url = `${baseUrl}/product-values-categories/${id}`;

  const token = localStorage.getItem("token") || "";

  return fetch(url, {
    headers: {
      "x-token": token,
    },
  });
};
