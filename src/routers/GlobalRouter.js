import { BannerShopInfo } from "components/BannerShopInfo";
import { BootstrapCarousel } from "components/BootstrapCarousel";
import { Menu } from "components/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const GlobalRouter = () => {
  return (
    <Router>
      <div>
        <Menu />
        <BootstrapCarousel />
        <BannerShopInfo />
        {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <h1>About</h1>
          </Route>
          <Route path="/users">
            <h1>Users</h1>
          </Route>
          <Route path="/">
            <></>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
