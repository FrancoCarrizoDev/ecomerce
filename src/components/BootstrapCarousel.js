import { Carousel } from "react-bootstrap"
import car3 from "../images/carousel/car2.png"
import car2 from "../images/carousel/car3.png"
import car1 from "../images/carousel/car1.png"

export const BootstrapCarousel = ({ height = "50vh" }) => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car1}
          alt="First slide"
          style={{
            height,
            objectFit: "cover",
            objectPosition: "50% 30%",
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car3}
          alt="Second slide"
          style={{
            height,
            objectFit: "cover",
            objectPosition: "50% 35%",
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={car2}
          alt="Third slide"
          style={{
            height,
            objectFit: "cover",
            objectPosition: "50% 35%",
          }}
        />
      </Carousel.Item>
    </Carousel>
  )
}
