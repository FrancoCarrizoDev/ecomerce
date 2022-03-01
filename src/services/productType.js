const baseUrl = process.env.REACT_APP_API_URL

// TODO para los gets no hace falta enviar el token

export const getProductsType = () => {
  const url = `${baseUrl}/product-types`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'GET',
    headers: {
      'x-token': token,
    },
  })
    .then((data) => data.json())
    .then((response) => {
      return response.productTypes
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const createProductType = (name) => {
  const url = `${baseUrl}/product-types`

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

export const updateProductType = (name, id) => {
  const url = `${baseUrl}/product-types/${id}`

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

export const disableProductType = (_, id) => {
  const url = `${baseUrl}/product-types/${id}`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
}
