import { LateralMenu } from "components/LateralMenu";
import { ProductAdminPanel } from "components/ProductAdminPanel";
import { HomeAdminPanel } from "pages/HomeAdminPanel";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useRouteMatch } from "../../node_modules/react-router-dom/cjs/react-router-dom.min";
import { ProductAdminRouter } from "./ProductAdminRouter";

export const AdminRouter = () => {
  let { path, url } = useRouteMatch();

  return (
    <Router>
      <div className="d-flex">
        <LateralMenu url={url} />
        <Switch>
          <Route exact path={`${path}/`}>
            <HomeAdminPanel />
          </Route>
          <Route path={`${path}/products`}>
            <ProductAdminRouter />
          </Route>
          <Redirect to={`${path}/`} />
        </Switch>
      </div>
    </Router>
  );
};
