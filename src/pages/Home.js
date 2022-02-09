import { BannerOffer } from "src/components/BannerOffer"
import { BannerSale } from "src/components/BannerSale"
import { BannerShopInfo } from "src/components/BannerShopInfo"
import { BootstrapCarousel } from "src/components/BootstrapCarousel"
import { SeasonCarousel } from "src/components/SeasonCarousel"
import { TestimonialsCarousel } from "src/components/TestimonialsCarousel"

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
