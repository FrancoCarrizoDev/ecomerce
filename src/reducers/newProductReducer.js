import { types } from '../types/types'

const ACTIONS_REDUCERS = {
  [types.newProductChangeName]: (state, action) => ({
    ...state,
    name: action.payload,
  }),
  [types.newProductChangePrice]: (state, action) => ({
    ...state,
    price: action.payload,
  }),
  [types.newProductChangeQuantity]: (state, action) => ({
    ...state,
    quantity: action.payload,
  }),
  [types.newProductChangeImg]: (state, action) => ({
    ...state,
    img: action.payload,
  }),
  [types.newProductChangeDescription]: (state, action) => ({
    ...state,
    description: action.payload,
  }),

  [types.newProductChangeCode]: (state, action) => ({
    ...state,
    code: action.payload,
  }),
  [types.newProductChangeType]: (state, action) => ({
    ...state,
    type: action.payload,
  }),
  [types.newProductChangeSubType]: (state, action) => ({
    ...state,
    subType: action.payload,
  }),
  [types.newProductChangeTypeAndValueCategory]: (state, action) => ({
    ...state,
    tycValTycs: action.payload,
  }),
  [types.newProductChangeCategoriesAndValueCategory]: (state, action) => ({
    ...state,
    catValCats: action.payload,
  }),
  [types.newProductStartChecking]: (state) => ({
    ...state,
    checking: true,
  }),
  [types.newProductStopChecking]: (state) => ({
    ...state,
    checking: false,
  }),
  [types.cleanNewProductState]: () => ({
    undefined,
  }),
}

export const newProductReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
