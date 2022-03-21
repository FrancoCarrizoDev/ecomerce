import { types } from '../types/types'

const ACTIONS_REDUCERS = {
  [types.clearProductTypeCategories]: (state) => ({
    ...state,
    typeCategories: [],
  }),
  [types.getProductTypeCategories]: (state, action) => ({
    ...state,
    typeCategories: [...action.payload],
  }),
  [types.productTypeCategoriesStartChecking]: (state) => ({
    ...state,
    checking: true,
  }),
  [types.productTypeCategoriesStopChecking]: (state) => ({
    ...state,
    checking: false,
  }),
}

export const productTypeCategoriesReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
