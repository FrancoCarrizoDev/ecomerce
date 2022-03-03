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

export const getProductsSubTypesByProductId = (id) => {
  const url = `${baseUrl}/product-sub-types/${id}`

  return fetch(url, {
    method: 'GET',
  })
    .then((data) => data.json())
    .then((response) => {
      return response
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const createProductSubType = (name, id) => {
  const url = `${baseUrl}/product-sub-types`

  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify({ name, product_type_fk: id }),
  })
}

export const updateProductSubType = (name, id) => {
  const url = `${baseUrl}/product-sub-types/${id}`

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

export const disableProductSubType = (_, id) => {
  const url = `${baseUrl}/product-sub-types/${id}`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
}
