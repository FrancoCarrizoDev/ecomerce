import { types } from '../types/types'

const ACTIONS_REDUCERS = {
  [types.getProductCategories]: (state, action) => ({
    ...state,
    categories: [...action.payload],
  }),
  [types.productCategoriesStartChecking]: (state) => ({
    ...state,
    checking: true,
  }),
  [types.productCategoriesStopChecking]: (state) => ({
    ...state,
    checking: false,
  }),
  [types.clearProductCategories]: (state) => ({
    ...state,
    categories: [],
  }),
}

export const productCategoriesReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
