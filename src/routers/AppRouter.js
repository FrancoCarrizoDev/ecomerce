import { startCheking } from "actions/auth";
import { Footer } from "components/Footer";
import { Loading } from "components/Loading";
import { Menu } from "components/Menu";

import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { Product } from "pages/Product";
import { Register } from "pages/Register";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector((state) => state.rootReducer.loading);

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
          <Route exact path="/">
            <Menu />
            <Home />
            <Footer />
          </Route>
          <Route path={`/hombre`}>
            <div className="min-vh-100">
              <Menu />
              <Product />
              <Footer />
            </div>
          </Route>
          <Route path="hombre/:id">
            <div className="min-vh-100">
              <Product />
            </div>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
