import { combineReducers } from 'redux'
import { appSelectedReducer } from './appSelectedReducer'
import { authReducer } from './authReducer'
import { loadingReducer } from './loadingReducer'
import { newProductReducer } from './newProductReducer'
import { productCategoriesReducer } from './productCategoriesReducer'
import { productReducer } from './productReducer'
import { productSubTypesReducer } from './productSubTypesReducer'
import { productTypeCategoriesReducer } from './productTypeCategoriesReducer'
import { productTypeReducer } from './productTypeReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  productCategories: productCategoriesReducer,
  appSelected: appSelectedReducer,
  productTypeCategories: productTypeCategoriesReducer,
  productSubTypes: productSubTypesReducer,
  productType: productTypeReducer,
  newProduct: newProductReducer,
  product: productReducer,
})
