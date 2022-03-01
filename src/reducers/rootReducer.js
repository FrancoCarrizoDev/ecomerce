import { combineReducers } from 'redux'
import { appSelectedReducer } from './appSelectedReducer'
import { authReducer } from './authReducer'
import { loadingReducer } from './loadingReducer'
import { productCategoriesReducer } from './productCategoriesReducer'
import { productSubTypesReducer } from './productSubTypesReducer'
import { productTypeCategoriesReducer } from './productTypeCategoriesReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  productCategories: productCategoriesReducer,
  appSelected: appSelectedReducer,
  productTypeCategories: productTypeCategoriesReducer,
  productSubTypes: productSubTypesReducer,
})
