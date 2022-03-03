import { getProductsSubTypesByProductId } from 'src/services/productSubTypes'

const { types } = require('src/types/types')

const productSubTypeStartCheckingAction = () => ({
  type: types.productSubTypeStartChecking,
})

const productSubTypeStopCheckingAction = () => ({
  type: types.productSubTypeStopChecking,
})

const getProductSubTypeAction = (productSubTypes) => ({
  type: types.getProductSubType,
  payload: productSubTypes,
})

export const getProductSubType = (typeId) => {
  return async (dispatch) => {
    try {
      dispatch(productSubTypeStartCheckingAction())
      const initialCategories = await getProductsSubTypesByProductId(typeId)
      dispatch(getProductSubTypeAction(initialCategories))
    } catch (error) {
      dispatch(getProductSubTypeAction([]))
    } finally {
      dispatch(productSubTypeStopCheckingAction())
    }
  }
}
