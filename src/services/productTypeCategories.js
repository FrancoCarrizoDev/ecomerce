const baseUrl = process.env.REACT_APP_API_URL

// TODO para los gets no hace falta enviar el token

export const getProductsTypeCategories = (id) => {
  const url = `${baseUrl}/product-type-categories/${id}`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'GET',
    headers: {
      'x-token': token,
    },
  })
    .then((data) => data.json())
    .then((response) => response)
    .catch((err) => {
      throw new Error(err)
    })
}

export const createProductTypeCategory = (name, id) => {
  const url = `${baseUrl}/product-type-categories`

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

export const updateProductTypeCategory = (name, id) => {
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

export const disableProductTypeCategories = (_, id) => {
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

export const getProductTypeValuesCategories = async (
  categorySelected,
  setCategorySelected,
  setValuesCategories,
  checking
) => {
  const url = `${baseUrl}/product-type-value-categories/${categorySelected.id}`

  const token = localStorage.getItem('token') || ''
  checking && checking(true)
  return await fetch(url, {
    headers: {
      'x-token': token,
    },
  })
    .then((data) => data.json())
    .then((response) => {
      setCategorySelected &&
        setCategorySelected({
          name: categorySelected.name,
          id: categorySelected.id,
        })
      setValuesCategories(response)
      checking && checking(false)
    })
}

export const createProductsTypeValueCategory = (value, categoryId) => {
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

export const updateProductTypeValueCategory = (value, id) => {
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

export const disableProductTypeValueCategories = (_, id) => {
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
