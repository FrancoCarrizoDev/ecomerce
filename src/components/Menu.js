import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../images/owl.png";
import shopingCartIcon from "../images/shopping-cart.png";
import notificationIcon from "../images/ringing.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export const Menu = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="white" variant="light">
      <Container>
        <Navbar.Brand href="#" className="d-flex">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <h1>
          <span className="fw-normal">Owl</span>
          <span className="fw-light">Ship</span>
        </h1>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link href="#">Hombre</Nav.Link>
            <Nav.Link href="#">Mujer</Nav.Link>
            <NavDropdown title="Categorías" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#">Calzados</NavDropdown.Item>
              <NavDropdown.Item href="#">Remeras</NavDropdown.Item>
              <NavDropdown.Item href="#">Camisas</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Vestidos</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Promociones</Nav.Link>
            <Nav.Link href="#">FAQS</Nav.Link>
            <Nav.Link href="#">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-md-none w-100">
          {/* esto va a ser un componente */}
          <div className="input-group my-2">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar ..."
              aria-label="Buscar ..."
              aria-describedby="buscador"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="buscador"
            >
              <FontAwesomeIcon icon={faSearch} fixedWidth />
            </button>
          </div>
          <div className="d-flex align-items-center">
            <Nav className="me-auto flex-row" style={{ gap: "7px" }}>
              <Nav.Link href="#deets" className="fw-bold">
                Jhon
              </Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Mis Compras
              </Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Favoritos
              </Nav.Link>
            </Nav>

            <div className="d-flex align-items-center" style={{ gap: "7px" }}>
              <span>
                <img
                  src={notificationIcon}
                  alt="shopingcart"
                  style={{ width: 1.8 + "em" }}
                />
              </span>
              <span>
                <img
                  src={shopingCartIcon}
                  alt="shopingcart"
                  style={{ width: 2 + "em" }}
                />
              </span>
              <span className="border rounded-circle px-2 d-flex align-items-center ">
                3
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};
