import { getProductsSubTypes } from 'src/services/productSubTypes'

const { types } = require('src/types/types')

const getProductTypeCategoriesAction = (productTypeCategories) => ({
  type: types.getProductTypeCategories,
  payload: productTypeCategories,
})

export const getProductTypeCategories = () => {
  return async (dispatch) => {
    try {
      debugger
      const initialCategories = await getProductsSubTypes()
      dispatch(getProductTypeCategoriesAction(initialCategories))
    } catch (error) {
      console.log(error)
    }
  }
}
