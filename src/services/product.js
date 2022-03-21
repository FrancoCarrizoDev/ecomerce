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
      product_tyc_fk: tycValTyc.typeCat.id,
      product_val_tyc_fk: tycValTyc.subTypeValCat.id,
    }),
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
      product_cat_fk: catValCat.cat.id,
      product_val_cat_fk: catValCat.valCat.id,
    }),
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
  debugger
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
