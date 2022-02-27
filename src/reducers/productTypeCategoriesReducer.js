import { types } from '../types/types'

const ACTIONS_REDUCERS = {
  [types.getProductTypeCategories]: (state, action) => ({
    ...state,
    typeCategories: [...action.payload],
  }),
}

export const productTypeCategoriesReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
