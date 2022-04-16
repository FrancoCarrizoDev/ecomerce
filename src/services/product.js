const baseUrl = process.env.REACT_APP_API_URL

export const createProduct = (product) => {
  const url = `${baseUrl}/products`

  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(product),
  })
}

export const editProducts = (product) => {
  const url = `${baseUrl}/products/${product.id}`

  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(product),
  })
}

export const createTycValTyc = (productId, tycValTyc) => {
  const url = `${baseUrl}/product-tyc-val-tyc`
  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify({
      product_fk: productId,
      product_tyc_fk: tycValTyc.typeCat.id || tycValTyc.typeCat._id,
      product_val_tyc_fk: tycValTyc.subTypeValCat.id || tycValTyc.subTypeValCat._id,
    }),
  })
}

export const deleteTycValTycById = (tycValTycId) => {
  const url = `${baseUrl}/product-tyc-val-tyc/${tycValTycId}`
  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
}

export const createCatValCat = (productId, catValCat) => {
  const url = `${baseUrl}/product-cat-val-cat`
  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify({
      product_fk: productId,
      product_cat_fk: catValCat.cat.id || catValCat.cat._id,
      product_val_cat_fk: catValCat.valCat.id || catValCat.valCat._id,
    }),
  })
}

export const deleteCatValCatById = (catValCatId) => {
  const url = `${baseUrl}/product-cat-val-cat/${catValCatId}`
  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
}

export const getTycValTycsByProductId = (id) => {
  const url = `${baseUrl}/product-tyc-val-tyc/${id}`

  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
    .then((resp) => resp.json())
    .then((data) => data)
}

export const getCatValCatsByProductId = (id) => {
  const url = `${baseUrl}/product-cat-val-cat/${id}`

  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
    .then((resp) => resp.json())
    .then((data) => data)
}

export const updateProductTycValTycByProductId = (id, tycValTycs, catValCats) => {
  const url = `${baseUrl}/products/${id}`

  const token = localStorage.getItem('token') || ''

  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify({ tycValTycs, catValCats }),
  })
}

export const getProducts = ({ limit = 12, skip = 0, ...rest } = { limit: 12, skip: 0 }) => {
  const url = `${baseUrl}/products?`

  const token = localStorage.getItem('token') || ''
  const params = Object.keys(rest).length > 0 ? { limit, skip, ...rest } : { limit, skip }
  return fetch(url + new URLSearchParams(params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
    .then((resp) => resp.json())
    .then((data) => data.products)
}

export const getProductById = (id) => {
  const url = `${baseUrl}/products/${id}`

  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
    .then((resp) => resp.json())
    .then((data) => data)
}

export const getGenders = () => {
  const url = `${baseUrl}/genders`

  const token = localStorage.getItem('token') || ''
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
    .then((resp) => resp.json())
    .then((data) => data)
}
