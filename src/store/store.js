import { rootReducer } from '../reducers/rootReducer'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const storageConfig = {
  key: 'root', // debe tener
  storage, // Mecanismo de caché
}

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const reducers = combineReducers({
  rootReducer,
})

const myPersistReducer = persistReducer(storageConfig, reducers)
const store = createStore(myPersistReducer, composeEnhancers(applyMiddleware(thunk)))

export const persistor = persistStore(store)
export default store
