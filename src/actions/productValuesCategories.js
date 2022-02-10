const { types } = require("src/types/types")

const getProductvaluesCategoriesAction = (categoryId) => ({
  type: types.getProductValueCategories,
  payload: categoryId,
})

export const getProductValuesCategoriesD = () => {
  return async (dispatch) => {
    dispatch(getProductvaluesCategoriesAction())
  }
}
