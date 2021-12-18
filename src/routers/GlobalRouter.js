import { BannerOffer } from "components/BannerOffer";
import { BannerSale } from "components/BannerSale";
import { BannerShopInfo } from "components/BannerShopInfo";
import { BootstrapCarousel } from "components/BootstrapCarousel";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import { TestimonialsCarousel } from "components/TestimonialsCarousel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SeasonCarousel } from "../components/SeasonCarousel";

export const GlobalRouter = () => {
  return (
    <Router>
      <div>
        <Menu />
        <BootstrapCarousel />
        <BannerSale />
        <BannerOffer />
        <BannerShopInfo />
        <BannerSale />
        <SeasonCarousel />
        <BannerSale />
        <TestimonialsCarousel />
        <Footer />
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
