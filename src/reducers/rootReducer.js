import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { loadingReducer } from "./loadingReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
})
