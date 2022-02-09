import { ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBoxOpen,
  faImages,
  faHome,
  faTshirt,
} from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
export const LateralMenu = ({ url }) => {
  return (
    <div className="lateralMenuContainer">
      <div className="p-3 d-flex justify-content-center align-items-center">
        <h4 className="mb-0">Admin Panel</h4>
      </div>

      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <FontAwesomeIcon icon={faHome} />
          <NavLink to={`${url}/`}>
            <span>Inicio</span>
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item as="li" to="/">
          <FontAwesomeIcon icon={faTshirt} />
          <NavLink to={`${url}/products`}>Productos</NavLink>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <FontAwesomeIcon icon={faBoxOpen} />
          <NavLink to={`${url}/products`}>Pedidos</NavLink>
        </ListGroup.Item>

        <ListGroup.Item as="li">
          <FontAwesomeIcon icon={faImages} />
          <NavLink to={`${url}/products`}>Banners</NavLink>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}
