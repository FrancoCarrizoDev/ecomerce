import { types } from 'src/types/types'

const initialState = {
  checking: false,
}

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.startLoading:
      return {
        ...state,
        checking: true,
      }
    case types.stopLoading:
      return {
        ...state,
        checking: false,
      }
    default:
      return state
  }
}
