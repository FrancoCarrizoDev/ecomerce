import { types } from '../types/types'

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
      }
    case types.authChekingFinish:
      return {
        ...state,
      }
    case types.authLogout:
      return {}
    case types.authAdminLogin:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
