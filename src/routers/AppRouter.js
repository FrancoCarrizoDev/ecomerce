import { startCheking } from "actions/auth";
import { Loading } from "components/Loading";
import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { Product } from "pages/Product";
import { Register } from "pages/Register";
import { UserPanel } from "pages/UserPanel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { CustomRoute } from "./CustomRoute";
// import { CustomRouteWithAuth } from "./CustomRouteWithAuth";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector((state) => state.rootReducer.loading);
  const { uid } = useSelector((state) => state.rootReducer.auth);

  useEffect(() => {
    if (
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== "undefined"
    )
      return dispatch(startCheking());
  }, [dispatch]);

  return (
    <Router>
      <div>
        {checking && <Loading />}
        <Switch>
          <CustomRoute exact path="/" component={Home} />
          <CustomRoute path={`/hombre`} component={Product} />
          <CustomRoute exact path="hombre/:id" component={Product} />
          {/* <CustomRouteWithAuth
            path="/my-account/:id"
            component={UserPanel}
            uid={!!uid}
          /> */}
          <Route
            path="/my-account/:id"
            render={() => (!!uid ? <UserPanel /> : <Redirect to="/login" />)}
          />
          <Route
            path="/login"
            render={() => (!!uid ? <Redirect to="/" /> : <Login />)}
          />
          <Route
            path="/register"
            render={() => (!!uid ? <Redirect to="/" /> : <Register />)}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
