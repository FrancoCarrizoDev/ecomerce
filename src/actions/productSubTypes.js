import { getProductsSubTypes } from 'src/services/productSubTypes'

const { types } = require('src/types/types')

const getProductSubTypeAction = (productSubTypes) => ({
  type: types.getProductSubType,
  payload: productSubTypes,
})

export const getProductSubType = () => {
  return async (dispatch) => {
    try {
      const initialCategories = await getProductsSubTypes()
      dispatch(getProductSubTypeAction(initialCategories))
    } catch (error) {
      console.log(error)
    }
  }
}
