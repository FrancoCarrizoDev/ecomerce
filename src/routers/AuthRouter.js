import { Login } from "pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export const AuthRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/auth/login">
            <Login />
          </Route>
          <Route exact path="/auth/register">
            <Login />
          </Route>
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
