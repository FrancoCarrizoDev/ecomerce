import { getProductsCategories } from "src/services/productCategories"

const { types } = require("src/types/types")

const getProductCategoriesAction = (categories) => ({
  type: types.getProductCategories,
  payload: categories,
})

export const getProductCategoriesD = () => {
  return async (dispatch) => {
    const fetchGetCategories = async () => {
      try {
        const initialCategories = await getProductsCategories()
        dispatch(getProductCategoriesAction(initialCategories))
        // setCategories(initialCategories)
      } catch (error) {
        console.log(error)
      }
    }
    fetchGetCategories()
  }
}
