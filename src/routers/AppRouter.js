import { startCheking } from "actions/auth";
import { Footer } from "components/Footer";
import { Loading } from "components/Loading";

import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { Product } from "pages/Product";
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
  const { checking } = useSelector((state) => state.rootReducer.auth);

  useEffect(() => {
    dispatch(startCheking());
  }, [dispatch]);

  // if (checking) {
  //   return <Loading />;
  // }

  return (
    <Router>
      <div>
        {checking && <Loading />}
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
        <Footer />
      </div>
    </Router>
  );
};
