import logo from "../images/owl.png";
import { Form, Button } from "react-bootstrap";
const arrTest = [1, 2, 3];

export const Footer = () => {
  return (
    <div className="bg-white  shadow-lg">
      <div className="container d-flex flex-column flex-lg-row justify-content-around align-content-center py-4">
        <div className="d-flex justify-content-center align-items-center  ">
          <div href="#" className="d-flex me-2">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </div>
          <h1 className="mb-0">
            <span className="fw-normal">Owl</span>
            <span className="fw-light">Ship</span>
          </h1>
        </div>
        <div className="d-flex justify-content-center">
          {arrTest.map((i) => (
            <div
              className=" d-flex flex-column flex-wrap justify-content-center align-items-center footerList"
              key={`footer-${i}`}
            >
              <h6 className=" mb-0 text-u">
                <ins>AYUDA</ins>
              </h6>
              <ul className="d-flex flex-column justify-content-center  ">
                <li>
                  <a href="#id">Preguntas frecuentes</a>
                </li>
                <li>
                  <a href="#id">Formas de pago</a>
                </li>
                <li>
                  <a href="#id">Promociones</a>
                </li>
                <li>
                  <a href="#id">Botón de arrepentimiento</a>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex flex-column mb-2">
            <small style={{ fontWeight: "600" }}>
              Suscribite a nuestro Newsletter
            </small>
            <small>y enterate de nuestras promociones</small>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                size="sm"
                type="email"
                placeholder="Ingresá tu mail"
              />
              <Form.Text className="text-muted">
                Puedes desuscribirte cuando quieras.
              </Form.Text>
            </Form.Group>

            <Form.Group
              className="mb-2 d-flex justify-content-between align-content-center"
              controlId="formBasicCheckbox"
            >
              <small>
                <Form.Check type="checkbox" label="Hombre" className="h-100" />
              </small>
              <small>
                <Form.Check type="checkbox" label="Mujer" />
              </small>
              <small>
                <Form.Check type="checkbox" label="Teen & Kids" />
              </small>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              size="sm"
              className="rounded-sm w-100"
            >
              Enviar
            </Button>
          </Form>
        </div>
      </div>
      <hr />
      <div className="container p-2 mx-auto ">
        <ul className="postFooter d-flex flex-column flex-lg-row justify-content-center">
          <li>
            <a href="#id">
              <small>Términos y condiciones</small>
            </a>
          </li>
          <li>
            <a href="#id">
              <small>Política de privacidad</small>
            </a>
          </li>
          <li>
            <a href="#id">
              <small>About us</small>
            </a>
          </li>
          <li>
            <a href="#id">
              <small>Copyright &copy; </small>
            </a>
          </li>
          <li>
            <a href="#id">
              <small>Franco Carrizo Dev </small>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
