import { getProductsCategories } from 'src/services/productCategories'

const { types } = require('src/types/types')

const getProductCategoriesAction = (categories) => ({
  type: types.getProductCategories,
  payload: categories,
})

export const getProductCategories = () => {
  return async (dispatch) => {
    try {
      const initialCategories = await getProductsCategories()
      dispatch(getProductCategoriesAction(initialCategories))
    } catch (error) {
      console.log(error)
    }
  }
}


const createProductCategoriesAction = () => ({
  type: types.getProductCategories,
})

export const createProductCategories = () => {
  return async (dispatch) => {
    try {
      const initialCategories = await getProductsCategories()
      dispatch(createProductCategoriesAction(initialCategories))
    } catch (error) {
      console.log(error)
    }
  }
}