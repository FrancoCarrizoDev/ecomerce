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

export const AdminRouter = () => {
  let { path, url } = useRouteMatch();

  return (
    <Router>
      <div>
        <LateralMenu url={url} />
        <Switch>
          <Route exact path={`${path}/`}>
            <HomeAdminPanel />
          </Route>
          <Route path={`${path}/products`}>
            <ProductAdminPanel />
          </Route>
          <Redirect to={`${path}/`} />
        </Switch>
      </div>
    </Router>
  );
};
