const baseUrl = process.env.REACT_APP_API_URL

// TODO para los gets no hace falta enviar el token

export const getProductsCategories = (method = "GET") => {
  const url = `${baseUrl}/categories`

  const token = localStorage.getItem("token") || ""

  return fetch(url, {
    method,
    headers: {
      "x-token": token,
    },
  })
    .then((data) => data.json())
    .then((response) => response.categories)
    .catch((err) => {
      throw new Error(err)
    })
}

export const getProductValuesCategories = (
  categorySelected,
  setCategorySelected,
  setValuesCategories
) => {
  const url = `${baseUrl}/product-values-categories/${categorySelected.id}`

  const token = localStorage.getItem("token") || ""

  return fetch(url, {
    headers: {
      "x-token": token,
    },
  })
    .then((data) => data.json())
    .then((response) => {
      setCategorySelected({
        name: categorySelected.name,
        id: categorySelected.id,
      })
      setValuesCategories(response)
    })
}

export const createProductsValueCategory = (categoryId, value) => {
  const url = `${baseUrl}/product-values-categories`

  const token = localStorage.getItem("token") || ""

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify({ value, product_category_id: categoryId }),
  })
}

export const editProductValueCategory = (id, value) => {
  const url = `${baseUrl}/product-values-categories`

  const token = localStorage.getItem("token") || ""

  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify({ id, value }),
  })
}

export const disableProductValueCategories = (id) => {
  const url = `${baseUrl}/product-values-categories`

  const token = localStorage.getItem("token") || ""

  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify({ id }),
  })
}
