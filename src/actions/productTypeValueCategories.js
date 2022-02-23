const { types } = require('src/types/types')

const getProductTypeValuesCategoriesAction = (productTypeCategoryId) => ({
  type: types.getProductTypeValueCategories,
  payload: productTypeCategoryId,
})

export const getProductTypeValuesCategoriesD = () => {
  return async (dispatch) => {
    dispatch(getProductTypeValuesCategoriesAction())
  }
}
