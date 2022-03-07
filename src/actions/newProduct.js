const { types } = require('src/types/types')

const newProductChangeNameAction = (name) => ({
  type: types.newProductChangeName,
  payload: name,
})

export const newProductChangeName = (name) => {
  return async (dispatch) => {
    dispatch(newProductChangeNameAction(name))
  }
}

const newProductChangePriceAction = (price) => ({
  type: types.newProductChangePrice,
  payload: price,
})

export const newProductChangePrice = (price) => {
  return async (dispatch) => {
    dispatch(newProductChangePriceAction(price))
  }
}

const newProductChangeQuantityAction = (quantity) => ({
  type: types.newProductChangeQuantity,
  payload: quantity,
})

export const newProductChangeQuantity = (quantity) => {
  return async (dispatch) => {
    dispatch(newProductChangeQuantityAction(quantity))
  }
}

const newProductChangeImgAction = (img) => ({
  type: types.newProductChangeImg,
  payload: img,
})

export const newProductChangeImg = (img) => {
  return async (dispatch) => {
    dispatch(newProductChangeImgAction(img))
  }
}

const newProductChangeTypeAction = (type) => ({
  type: types.newProductChangeType,
  payload: type,
})

export const newProductChangeType = (type) => {
  return async (dispatch) => {
    dispatch(newProductChangeTypeAction(type))
  }
}

const newProductChangeSubTypeAction = (subType) => ({
  type: types.newProductChangeSubType,
  payload: subType,
})

export const newProductChangeSubType = (subType) => {
  return async (dispatch) => {
    dispatch(newProductChangeSubTypeAction(subType))
  }
}

const cleanNewProductAction = () => ({
  type: types.cleanNewProductState,
})

export const cleanNewProduct = () => {
  return async (dispatch) => {
    dispatch(cleanNewProductAction())
  }
}
