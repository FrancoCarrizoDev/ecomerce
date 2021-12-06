import { actionTest } from "components/actions/actionTest";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AdminRouter } from "./AdminRouter";
import { GlobalRouter } from "./GlobalRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionTest());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <GlobalRouter exact path="/" />
          <AdminRouter path="/auth" />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
