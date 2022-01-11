import testPhoto from "../images/modelo/prueba1.jpeg";
import testPhoto2 from "../images/modelo/prueba2.jpeg";
import { Card, Form } from "react-bootstrap";
import { ImageAndHoverImage } from "helpers/ImageAndHoverImage";

const arrayTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const CardProduct = ({ width }) => {
  return (
    <div className=" mt-3 ">
      <div className="d-flex justify-content-between ">
        <div className="flex-grow-1 pe-3">
          <h5>HOMBRE</h5>
          <hr />
        </div>
        {width >= 768 && (
          <div className="d-flex align-items-center">
            <span className="me-2">Ordenar</span>
            <Form.Select size="sm" aria-label="Default select example">
              <option>Más relevantes</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
        )}
      </div>
      <div className="gridCards ">
        {arrayTest.map((i) => (
          <div className="mb-3" key={`card-product-${i}`}>
            <Card className="border-0 shadow-sm">
              <ImageAndHoverImage
                background={testPhoto}
                hoverBackground={testPhoto2}
              />
              <Card.Body>
                <Card.Title>Blusa Reins</Card.Title>
                <p className="card-text">
                  <del className="me-3 text-muted">$3000</del>
                  <span>$2000</span>
                </p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
