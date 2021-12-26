import { ImageAndHoverImage } from "helpers/ImageAndHoverImage";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import foto1 from "../images/modelo/prueba1.jpeg";
import foto2 from "../images/modelo/prueba2.jpeg";
import foto3 from "../images/modelo/prueba3.jpeg";
import foto4 from "../images/modelo/slider.jpeg";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const SeasonCarousel = () => {
  return (
    <div className="container">
      <h4>Especiales de Verano</h4>
      <hr />
      <Carousel responsive={responsive}>
        <div className="card mx-auto shadow-sm" style={{ width: "18rem" }}>
          <ImageAndHoverImage background={foto4} hoverBackground={foto1} />
          <div className="card-body">
            <h6 className="card-title">Blusa Roma</h6>
            <p className="card-text">
              <del className="me-3 text-muted">$3000</del>
              <span>$2000</span>
            </p>
          </div>
        </div>
        <div className="card mx-auto shadow-sm" style={{ width: "18rem" }}>
          <ImageAndHoverImage background={foto1} hoverBackground={foto2} />

          <div className="card-body">
            <h6 className="card-title">Blusa Roma</h6>
            <p className="card-text">
              <del className="me-3 text-muted">$3000</del>
              <span>$2000</span>
            </p>
          </div>
        </div>
        <div className="card mx-auto shadow-sm" style={{ width: "18rem" }}>
          <ImageAndHoverImage background={foto2} hoverBackground={foto3} />
          <div className="card-body">
            <h6 className="card-title">Blusa Roma</h6>
            <p className="card-text">
              <del className="me-3 text-muted">$3000</del>
              <span>$2000</span>
            </p>
          </div>
        </div>
        <div className="card mx-auto shadow-sm" style={{ width: "18rem" }}>
          <ImageAndHoverImage background={foto3} hoverBackground={foto1} />
          <div className="card-body">
            <h6 className="card-title">Blusa Roma</h6>
            <p className="card-text">
              <del className="me-3 text-muted">$3000</del>
              <span>$2000</span>
            </p>
          </div>
        </div>
        <div className="card mx-auto shadow-sm" style={{ width: "18rem" }}>
          <ImageAndHoverImage background={foto4} hoverBackground={foto2} />
          <div className="card-body">
            <h6 className="card-title">Blusa Roma</h6>
            <p className="card-text">
              <del className="me-3 text-muted">$3000</del>
              <span>$2000</span>
            </p>
          </div>
        </div>
      </Carousel>
      ;
    </div>
  );
};
