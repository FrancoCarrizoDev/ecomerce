import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { loadingReducer } from "./loadingReducer"
import { productValuesCategoriesReducer } from "./productValuesCategoriesReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  productValuesCategories: productValuesCategoriesReducer,
})
