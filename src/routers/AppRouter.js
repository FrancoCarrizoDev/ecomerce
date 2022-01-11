import { actionTest } from "actions/actionTest";

import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { Product } from "pages/Product";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionTest());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path={`/hombre`}>
            <div className="min-vh-100">
              <Product />
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
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
