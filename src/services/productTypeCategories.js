const baseUrl = process.env.REACT_APP_API_URL

// TODO para los gets no hace falta enviar el token

export const getProductsTypeCategories = () => {
  const url = `${baseUrl}/product-type-categories`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'GET',
    headers: {
      'x-token': token,
    },
  })
    .then((data) => data.json())
    .then((response) => response.productTypeCategories)
    .catch((err) => {
      throw new Error(err)
    })
}

export const createProductTypeCategory = (name) => {
  const url = `${baseUrl}/product-type-categories`

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

export const updateProductTypeCategory = (id, name) => {
  const url = `${baseUrl}/product-type-categories/${id}`

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

export const disableProductTypeCategories = (id) => {
  const url = `${baseUrl}/product-type-categories/${id}`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
}

export const getProductTypeValuesCategories = (
  categorySelected,
  setCategorySelected,
  setValuesCategories
) => {
  const url = `${baseUrl}/product-type-value-categories/${categorySelected.id}`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    headers: {
      'x-token': token,
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

export const createProductsTypeValueCategory = (categoryId, value) => {
  const url = `${baseUrl}/product-type-value-categories`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify({ value, product_type_category_id: categoryId }),
  })
}

export const updateProductTypeValueCategory = (id, value) => {
  const url = `${baseUrl}/product-type-value-categories/${id}`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify({ value }),
  })
}

export const disableProductTypeValueCategories = (id) => {
  const url = `${baseUrl}/product-type-value-categories/${id}`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
}
