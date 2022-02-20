import { types } from '../types/types'

const ACTIONS_REDUCERS = {
  [types.getProductValueCategories]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [types.createProductValueCategories]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}

export const productValuesCategoriesReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
