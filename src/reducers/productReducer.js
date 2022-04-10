import { types } from '../types/types'

const ACTIONS_REDUCERS = {
  [types.selectProductCategory]: (state, action) => ({
    ...state,
    globalCategoriesSelected: [...action.payload] || [],
  }),
  [types.cleanSelectedProductCategory]: (state) => ({
    undefined,
  }),
}

export const productReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
