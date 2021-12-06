import { Provider } from "react-redux";
import { AppRouter } from "routers/AppRouter";
import { store } from "store/store";
import "./styles/App.scss";

export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
