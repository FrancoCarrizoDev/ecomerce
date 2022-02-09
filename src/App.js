import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { AppRouter } from "src/routers/AppRouter"
import store, { persistor } from "src/store/store"
import "src/styles/App.scss"

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  )
}
