// TODO falta hacer el servicio

import { getProductsType } from 'src/services/productType'

const { types } = require('src/types/types')

const getProductTypeAction = (productTypes) => ({
  type: types.getProductType,
  payload: productTypes,
})

export const getProductType = () => {
  return async (dispatch) => {
    try {
      const initialCategories = await getProductsType()
      dispatch(getProductTypeAction(initialCategories))
    } catch (error) {
      console.log(error)
    }
  }
}

const selectProductTypeAction = (selectedProductType) => ({
  type: types.selectProductType,
  payload: selectedProductType || {},
})

export const selectProductType = (selectedProductType) => {
  return async (dispatch) => {
    dispatch(selectProductTypeAction(selectedProductType))
  }
}

const cleanSelectProductTypeAction = () => ({
  type: types.cleanSelectedType,
})

export const cleanSelectedProductType = () => {
  return async (dispatch) => {
    dispatch(cleanSelectProductTypeAction())
  }
}
