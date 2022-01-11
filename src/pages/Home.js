import { BannerOffer } from "components/BannerOffer";
import { BannerSale } from "components/BannerSale";
import { BannerShopInfo } from "components/BannerShopInfo";
import { BootstrapCarousel } from "components/BootstrapCarousel";
import { Menu } from "components/Menu";
import { SeasonCarousel } from "components/SeasonCarousel";
import { TestimonialsCarousel } from "components/TestimonialsCarousel";

export const Home = () => {
  return (
    <>
      <Menu />
      <BootstrapCarousel />
      <BannerSale />
      <BannerOffer />
      <BannerShopInfo />
      <BannerSale />
      <SeasonCarousel />
      <BannerSale />
      <TestimonialsCarousel />
    </>
  );
};
