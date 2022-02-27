import { types } from '../types/types'

const ACTIONS_REDUCERS = {
  [types.getProductCategories]: (state, action) => ({
    ...state,
    categories: [...action.payload],
  }),
  [types.createProductCategories]: (state) => ({
    ...state,
  }),
}

export const productSubTypes = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
