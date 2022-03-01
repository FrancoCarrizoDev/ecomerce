import { getProductsSubTypesByProductId } from 'src/services/productSubTypes'

const { types } = require('src/types/types')

const getProductSubTypeAction = (productSubTypes) => ({
  type: types.getProductSubType,
  payload: productSubTypes,
})

export const getProductSubType = (typeId) => {
  return async (dispatch) => {
    try {
      dispatch(isChekingGetProductSubTypes(true))
      const initialCategories = await getProductsSubTypesByProductId(typeId)
      dispatch(getProductSubTypeAction(initialCategories))
    } catch (error) {
      dispatch(getProductSubTypeAction([]))
    } finally {
      dispatch(isChekingGetProductSubTypes(false))
    }
  }
}

const cleanSelectProductSubTypeAction = () => ({
  type: types.cleanProductsSubTypes,
})

export const cleanProductSubTypes = () => {
  return async (dispatch) => {
    dispatch(cleanSelectProductSubTypeAction())
  }
}

const chekingGetProductSubTypeAction = (isCheking) => ({
  type: types.getProductSubTypeCheking,
  payload: isCheking,
})

export const isChekingGetProductSubTypes = (isCheking) => {
  return async (dispatch) => {
    dispatch(chekingGetProductSubTypeAction(isCheking))
  }
}
