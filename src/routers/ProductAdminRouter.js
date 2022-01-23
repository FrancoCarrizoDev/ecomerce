import { LateralMenu } from "components/LateralMenu";
import { ProductAdminPanel } from "components/ProductAdminPanel";
import { HomeAdminPanel } from "pages/HomeAdminPanel";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import { useRouteMatch } from "../../node_modules/react-router-dom/cjs/react-router-dom.min";

export const ProductAdminRouter = () => {
  let { path, url } = useRouteMatch();

  return (
    <Router>
      <div className="d-flex flex-column">
        <ul className="d-flex gap-sm p-3" style={{ listStyle: "none" }}>
          <li>
            <NavLink to={`${url}/create`}>Crear</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/list`}>Lista</NavLink>
          </li>
        </ul>
        <Switch>
          <Route exact path={`${path}/create`}>
            <h1>Create Product</h1>
          </Route>
          <Route path={`${path}/list`}>
            <h1>List Product</h1>
          </Route>
          <Redirect to={`${path}/create`} />
        </Switch>
      </div>
    </Router>
  );
};
