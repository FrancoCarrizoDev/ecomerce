import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
export const LateralMenu = ({ url }) => {
  return (
    <div className="lateralMenuContainer text-white">
      <div className="p-3 d-flex justify-content-center align-items-center">
        <h4 className="mb-0">Admin Panel</h4>
      </div>

      <ListGroup as="ul">
        <ListGroup.Item as="li">Inicio</ListGroup.Item>
        <ListGroup.Item as="li" to="/">
          <FontAwesomeIcon icon={faCoffee} /> <NavLink to="/">Pedidos</NavLink>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <NavLink to={`${url}/products`}>Productos</NavLink>
        </ListGroup.Item>
        <ListGroup.Item as="li">Banners</ListGroup.Item>
      </ListGroup>
    </div>
  );
};
