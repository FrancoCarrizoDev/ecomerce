import { actionTest } from "actions/actionTest";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
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
          <AdminRouter path="/auth" />
          <GlobalRouter path="/" />
        </Switch>
      </div>
    </Router>
  );
};
