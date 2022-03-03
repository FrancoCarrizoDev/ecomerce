import { getProductsTypeCategories } from 'src/services/productTypeCategories'

const { types } = require('src/types/types')

const productTypeCategorieStartChecking = () => ({
  type: types.productTypeCategoriesStartChecking,
})

const productTypeCategorieStopChecking = () => ({
  type: types.productTypeCategoriesStopChecking,
})

const getProductTypeCategoriesAction = (productTypeCategories) => ({
  type: types.getProductTypeCategories,
  payload: productTypeCategories,
})

export const getProductTypeCategories = (id) => {
  return async (dispatch) => {
    try {
      dispatch(productTypeCategorieStartChecking())
      const initialCategories = await getProductsTypeCategories(id)
      dispatch(getProductTypeCategoriesAction(initialCategories))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(productTypeCategorieStopChecking())
    }
  }
}
