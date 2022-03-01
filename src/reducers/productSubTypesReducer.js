import { types } from '../types/types'

const ACTIONS_REDUCERS = {
  [types.getProductSubType]: (state, action) => ({
    ...state,
    productSubTypes: [...action.payload],
  }),
  [types.cleanProductsSubTypes]: (state) => ({
    ...state,
    productSubTypes: [],
  }),
  [types.getProductSubTypeCheking]: (state, action) => ({
    ...state,
    isCheking: action.payload || false,
  }),
}

export const productSubTypesReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
