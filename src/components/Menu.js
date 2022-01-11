import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../images/owl.png";
import shopingCartIcon from "../images/shopping-cart.png";
import notificationIcon from "../images/ringing.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useWindowsSize from "../hooks/useWindowsSize";
import { NavLink } from "react-router-dom";

export const Menu = () => {
  const { width } = useWindowsSize();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
      sticky="top"
    >
      <Container>
        <div className="d-flex align-items-center mb-auto pt-1">
          <Navbar.Brand href="#" className="d-flex me-2">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <h1 className="mb-0 ">
            <span className="fw-normal text-dark">Owl</span>
            <span className="fw-light text-dark">Ship</span>
          </h1>
        </div>

        <div className=" align-content-center flex-column d-none d-lg-flex ">
          <div className="input-group  my-2">
            <input
              type="text"
              className="form-control "
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

          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav className="me-auto">
              <NavLink
                className={(isActive) =>
                  !isActive ? " nav-link" : "nav-link text-primary"
                }
                to="/hombre"
              >
                Hombre
              </NavLink>
              <NavLink to="/" className="nav-link">
                Mujer
              </NavLink>
              <NavLink to="/" className="nav-link">
                Teen & Kids
              </NavLink>
              <NavLink to="/" className="nav-link">
                Promociones
              </NavLink>
              <NavLink to="/" className="nav-link">
                FAQS
              </NavLink>
              <NavLink to="/" className="nav-link">
                Contacto
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </div>

        <div
          className="d-none d-lg-flex flex-column align-items-center justify-content-end"
          style={{ height: "94px" }}
        >
          <div
            className="w-100 d-flex align-items-center justify-content-end pe-2 "
            style={{ gap: "7px" }}
          >
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
          <Nav className="me-auto flex-row pe-2 pt-2 mt-1">
            <NavLink to="/login" className="fw-bold">
              Ingresar
            </NavLink>
            <Nav.Link eventKey={2} href="#memes">
              Registrar
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Ayuda
            </Nav.Link>
          </Nav>
        </div>

        {width < 991 && (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav " />
            <Navbar.Collapse id="responsive-navbar-nav ">
              <Nav className="me-auto d-md-none">
                <NavLink to="/nombre" className="nav-link">
                  Hombre
                </NavLink>
                <NavLink to="/nombre" href="#" className="nav-link">
                  Mujer
                </NavLink>
                <NavDropdown title="Categorías" id="collasible-nav-dropdown">
                  <NavLink to="/nombre" href="#" className="nav-link  ps-2">
                    Calzados
                  </NavLink>
                  <NavLink to="/nombre" href="#" className="nav-link ps-2">
                    Remeras
                  </NavLink>
                  <NavLink to="/nombre" href="#" className="nav-link ps-2">
                    Camisas
                  </NavLink>
                  <NavDropdown.Divider />
                  <NavLink to="/nombre" href="#" className="nav-link ps-2">
                    Vestidos
                  </NavLink>
                </NavDropdown>
                <NavLink to="/nombre" href="#" className="nav-link ">
                  Promociones
                </NavLink>
                <NavLink to="/nombre" href="#" className="nav-link ">
                  FAQS
                </NavLink>
                <NavLink to="/nombre" href="#" className="nav-link ">
                  Contacto
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
        <div className="d-lg-none w-100">
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
                  f="#"
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
