const { types } = require('src/types/types')

const selectCategoryAction = (categorySelected = []) => ({
  type: types.selectProductCategory,
  payload: categorySelected,
})

export const cleanSelectedProductCategories = () => ({
  type: types.cleanSelectedProductCategory,
})

export const selectCategory = (app) => {
  return async (dispatch) => {
    dispatch(selectCategoryAction(app))
  }
}
