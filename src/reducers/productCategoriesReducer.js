import { types } from "../types/types"

const ACTIONS_REDUCERS = {
  [types.getProductCategories]: (state, action) => ({
    ...state,
    categories: [...action.payload],
  }),
  [types.createProductCategories]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}

export const productCategoriesReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
