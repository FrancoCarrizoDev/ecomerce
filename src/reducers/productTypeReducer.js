import { types } from '../types/types'

const ACTIONS_REDUCERS = {
  [types.getProductType]: (state, action) => ({
    ...state,
    productType: [...action.payload],
  }),
  [types.selectProductType]: (state, action) => ({
    ...state,
    selectedType: action.payload || {},
  }),
  [types.cleanSelectedType]: (state) => ({
    ...state,
    selectedType: {},
  }),
  [types.productTypeStartChecking]: (state) => ({
    ...state,
    checking: true,
  }),

  [types.productTypeStopChecking]: (state) => ({
    ...state,
    checking: false,
  }),
}

export const productTypeReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
