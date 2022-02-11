import { Card } from "react-bootstrap"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import star from "../images/carousel/star.png"

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
}

const arrTest = [0, 1, 2, 3, 4]

export const TestimonialsCarousel = () => {
  return (
    <div className="container pb-5">
      <h4>¿Que opinan nuestros clientes?</h4>
      <hr />
      <Carousel responsive={responsive}>
        {arrTest.map((i) => (
          <Card style={{ width: "18rem" }} key={`testimonial-${i}`} className="mx-auto">
            <Card.Body>
              <div className="d-flex pb-3">
                <img src={star} alt="#" style={{ width: "1rem" }} />
                <img src={star} alt="#" style={{ width: "1rem" }} />
                <img src={star} alt="#" style={{ width: "1rem" }} />
                <img src={star} alt="#" style={{ width: "1rem" }} />
                <img src={star} alt="#" style={{ width: "1rem" }} />
              </div>
              <h6>Gran Servicio</h6>
              <Card.Text>
                La calidad de la ropa es increible, la atención muy buena y el envío llego a tiempo.
                Súper recomendable
              </Card.Text>
              <div className="d-flex" style={{ gap: "1rem" }}>
                <div style={{ width: "50px", height: "50px" }}>
                  <img
                    src="http://www.w3bai.com/w3css/img_avatar3.png"
                    alt="#"
                    className="img-fluid rounded-circle"
                  />
                </div>
                <div>
                  <h6>Florencia Nuñez</h6>
                  <small className="text-muted">27/11/2021</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Carousel>
    </div>
  )
}
