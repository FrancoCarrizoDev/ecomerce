import { types } from '../types/types'

const ACTIONS_REDUCERS = {
  [types.getProductType]: (state, action) => ({
    ...state,
    productType: [...action.payload],
  }),
}

export const productTypeReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
