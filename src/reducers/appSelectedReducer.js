import { types } from "../types/types"

const ACTIONS_REDUCERS = {
  [types.appSelected]: (state, action) => ({
    ...state,
    name: action.payload || "",
  }),
}

export const appSelectedReducer = (state = {}, action) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}
