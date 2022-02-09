import { BannerOffer } from "components/BannerOffer"
import { BannerSale } from "components/BannerSale"
import { BannerShopInfo } from "components/BannerShopInfo"
import { BootstrapCarousel } from "components/BootstrapCarousel"
import { SeasonCarousel } from "components/SeasonCarousel"
import { TestimonialsCarousel } from "components/TestimonialsCarousel"

export const Home = () => {
  return (
    <>
      <BootstrapCarousel />
      <BannerSale />
      <BannerOffer />
      <BannerShopInfo />
      <BannerSale />
      <SeasonCarousel />
      <BannerSale />
      <TestimonialsCarousel />
    </>
  )
}
