import logo from "../images/owl.png";
import notificationIcon from "../images/ringing.png";
import shopingCartIcon from "../images/shopping-cart.png";
import useWindowsSize from "../hooks/useWindowsSize";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { startLogout } from "actions/auth";
import { useDispatch, useSelector } from "react-redux";

export const Menu = () => {
  const { width } = useWindowsSize();
  const { auth } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(startLogout());
  };
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
              <NavLink className="nav-link text-black" to="/hombre">
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

        <div className=" d-none d-lg-flex flex-column gap-md  ">
          <div
            className="w-100 d-flex align-items-center justify-content-end pe-2 "
            style={{ gap: "7px" }}
          >
            <span>
              <img
                src={notificationIcon}
                alt="shopingcart"
                className="smallIcon"
              />
            </span>
            <span>
              <img
                src={shopingCartIcon}
                alt="shopingcart"
                className="smallIcon"
              />
            </span>
            <span className="border border-dark rounded-circle px-2 d-flex align-items-center ">
              0
            </span>
          </div>
          <Nav className=" align-items-center justify-content-center  flex-row gap-md pe-2  ">
            <NavLink
              to={`${auth.name ? `/my-account` : "/login"}`}
              className="fw-bold d-flex gap-xs"
            >
              {auth.name ? auth.name.split(" ")[0].toUpperCase() : "Ingresar"}
              {/* <span>
                <img
                  src={downArrowIcon}
                  alt="shopingcart"
                  className="xSmallIcon"
                />
              </span> */}
            </NavLink>
            <NavLink
              to={`${auth.name ? "/my-acount/my-shopping" : "/register"}`}
            >
              {auth.name ? "Mis Compras" : "Registrarse"}
            </NavLink>
            {auth.name ? (
              <button className="btn nav-link" onClick={handleLogout}>
                Salir
              </button>
            ) : (
              <NavLink to="/ayuda">Ayuda</NavLink>
            )}
            {/* <NavLink to="/logout">{auth.name ? "Salir" : "Ayuda"}</NavLink> */}
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
              <NavLink
                to={`${auth.name ? "/my-acount" : "/login"}`}
                className="fw-bold"
              >
                {auth.name?.toUpperCase() || "Ingresar"}
              </NavLink>
              <NavLink
                to={`${auth.name ? "/my-acount/my-shopping" : "/register"}`}
              >
                {auth.name ? "Mis Compras" : "Registrarse"}
              </NavLink>
              {auth.name ? (
                <button className="btn nav-link" onClick={handleLogout}>
                  Salir
                </button>
              ) : (
                <NavLink to="/ayuda">Ayuda</NavLink>
              )}
            </Nav>

            <div className="d-flex align-items-center" style={{ gap: "7px" }}>
              <span>
                <img
                  src={notificationIcon}
                  alt="shopingcart"
                  f="#"
                  className="smallIcon"
                />
              </span>
              <span>
                <img
                  src={shopingCartIcon}
                  alt="shopingcart"
                  className="smallIcon"
                />
              </span>
              <span className="border rounded-circle px-2 d-flex align-items-center">
                0
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};
