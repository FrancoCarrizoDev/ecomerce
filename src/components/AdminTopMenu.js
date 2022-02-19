import { Container, Navbar, NavDropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faBell, faInbox } from "@fortawesome/free-solid-svg-icons"
export const AdminTopMenu = () => {
  return (
    <div className="adminTopMenuContainer">
      <Navbar variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">Franco Carrizo</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <NavDropdown
              title={<FontAwesomeIcon icon={faInbox} size="1xl" style={{ color: "white" }} />}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<FontAwesomeIcon icon={faBell} size="1xl" style={{ color: "white" }} />}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<FontAwesomeIcon icon={faBell} size="1xl" style={{ color: "white" }} />}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
            <div style={{ width: "35px", height: "35px" }}>
              <img
                src="http://www.w3bai.com/w3css/img_avatar3.png"
                alt="#"
                className="img-fluid rounded-circle"
              />
            </div>

            {/* <button className="btn btn-default btn-circle d-flex align-items-center px-3 text-white"></button> */}
            <NavDropdown
              title={<FontAwesomeIcon icon={faEllipsisV} size="1xl" style={{ color: "white" }} />}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
