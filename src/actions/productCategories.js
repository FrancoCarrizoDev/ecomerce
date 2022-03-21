import { getProductsCategories } from 'src/services/productCategories'

const { types } = require('src/types/types')

const productCategorieStartChecking = () => ({
  type: types.productCategoriesStartChecking,
})

const productCategorieStopChecking = () => ({
  type: types.productCategoriesStopChecking,
})

const getProductCategoriesAction = (categories) => ({
  type: types.getProductCategories,
  payload: categories,
})

export const clearProductCategories = () => ({
  type: types.clearProductCategories,
})

export const getProductCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(productCategorieStartChecking())
      const initialCategories = await getProductsCategories()
      dispatch(getProductCategoriesAction(initialCategories))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(productCategorieStopChecking())
    }
  }
}

const createProductCategoriesAction = () => ({
  type: types.getProductCategories,
})

export const createProductCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(productCategorieStartChecking())
      const initialCategories = await getProductsCategories()
      dispatch(createProductCategoriesAction(initialCategories))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(productCategorieStopChecking())
    }
  }
}
