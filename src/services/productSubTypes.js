const baseUrl = process.env.REACT_APP_API_URL

// TODO para los gets no hace falta enviar el token

export const getProductsSubTypes = () => {
  const url = `${baseUrl}/product-sub-types`

  return fetch(url, {
    method: 'GET',
  })
    .then((data) => data.json())
    .then((response) => response.productSubTypes)
    .catch((err) => {
      throw new Error(err)
    })
}

export const createProductCategory = (name) => {
  const url = `${baseUrl}/categories`

  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify({ name }),
  })
}

export const updateProductCategory = (name, id) => {
  debugger
  const url = `${baseUrl}/categories/${id}`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify({ name }),
  })
}

export const disableProductCategories = (_, id) => {
  const url = `${baseUrl}/categories/${id}`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
}
