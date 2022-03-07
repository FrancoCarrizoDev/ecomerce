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
  [types.productSubTypeStartChecking]: (state) => ({
    ...state,
    checking: true,
  }),

  [types.productSubTypeStopChecking]: (state) => ({
    ...state,
    checking: false,
  }),
}

export const productSubTypesReducer = (state = { productSubTypes: [] }, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
