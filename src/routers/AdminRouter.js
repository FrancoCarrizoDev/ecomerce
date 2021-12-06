import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export const AdminRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/auth/login">
            <h1>About</h1>
          </Route>
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
