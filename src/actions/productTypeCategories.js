import { getProductsTypeCategories } from 'src/services/productTypeCategories'

const { types } = require('src/types/types')

const getProductTypeCategoriesAction = (productTypeCategories) => ({
  type: types.getProductTypeCategories,
  payload: productTypeCategories,
})

export const getProductTypeCategories = () => {
  return async (dispatch) => {
    try {
      const initialCategories = await getProductsTypeCategories()
      dispatch(getProductTypeCategoriesAction(initialCategories))
    } catch (error) {
      console.log(error)
    }
  }
}
