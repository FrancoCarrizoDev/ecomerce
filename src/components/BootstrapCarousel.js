import { Carousel } from "react-bootstrap";
import car3 from "../images/carousel/car1.jpg";
import car2 from "../images/carousel/car2.jpg";
import car1 from "../images/carousel/car3.jpg";

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
          <h3>Llevando 2 prendas</h3>
          <p>La segunda queda 50% off.</p>
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
          <h3>Combos imperdibles</h3>
          <p>Jean + Camisa + Calzado = Precio Único</p>
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
          <h3>Envios a todo el país</h3>
          <p>A partir de los $5000 de compra</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
