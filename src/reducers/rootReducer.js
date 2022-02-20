import { combineReducers } from 'redux'
import { appSelectedReducer } from './appSelectedReducer'
import { authReducer } from './authReducer'
import { loadingReducer } from './loadingReducer'
import { productCategoriesReducer } from './productCategoriesReducer'
import { productValuesCategoriesReducer } from './productValuesCategoriesReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  productCategories: productCategoriesReducer,
  productValuesCategories: productValuesCategoriesReducer,
  appSelected: appSelectedReducer,
})
