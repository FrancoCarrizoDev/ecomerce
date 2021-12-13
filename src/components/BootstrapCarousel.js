import { Carousel } from "react-bootstrap";
import car1 from "../images/carousel/car1.jpg";
import car2 from "../images/carousel/car2.jpg";
import car3 from "../images/carousel/car3.jpg";

export const BootstrapCarousel = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car1}
          alt="First slide"
          style={{
            height: "50vh",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        <Carousel.Caption
          className="rounded-3"
          style={{ backgroundColor: "rgba(0,0,0,.7)" }}
        >
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={car2}
          alt="Second slide"
          style={{
            height: "50vh",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <Carousel.Caption
          className="rounded-3"
          style={{ backgroundColor: "rgba(0,0,0,.7)" }}
        >
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={car3}
          alt="Third slide"
          style={{
            height: "50vh",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />

        <Carousel.Caption
          className="rounded-3"
          style={{ backgroundColor: "rgba(0,0,0,.7)" }}
        >
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
