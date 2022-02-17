import { ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBoxOpen,
  faImages,
  faHome,
  faTshirt,
  faChevronLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import { useState } from "react"
export const AdminLateralMenu = ({ url }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(true)
  const [test, setTest] = useState(false)

  return (
    <div className="lateralMenuContainer">
      <div className="p-3 d-flex justify-content-center align-items-center gap-sm ">
        {isMenuExpanded && <h5 className="mb-0">Admin</h5>}

        <button
          className="btn btn-default btn-circle border"
          onClick={() => {
            setIsMenuExpanded(!isMenuExpanded)
            setTest(true)
          }}
        >
          <FontAwesomeIcon
            icon={isMenuExpanded ? faChevronLeft : faBars}
            size="sm"
            style={{ color: "white " }}
          />
        </button>
      </div>

      <ListGroup as="ul" className={`${test ? "fadeIn" : null}`}>
        <ListGroup.Item as="li">
          <NavLink to={`${url}/`}>
            <FontAwesomeIcon icon={faHome} />
            {isMenuExpanded && <span>Inicio</span>}
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item as="li" to="/">
          <NavLink to={`${url}/products`}>
            <FontAwesomeIcon icon={faTshirt} />
            {isMenuExpanded && <span>Productos</span>}
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <NavLink to={`${url}/products`}>
            <FontAwesomeIcon icon={faBoxOpen} />
            {isMenuExpanded && <span>Pedidos</span>}
          </NavLink>
        </ListGroup.Item>

        <ListGroup.Item as="li">
          <NavLink to={`${url}/products`}>
            <FontAwesomeIcon icon={faImages} />
            {isMenuExpanded && <span>Banners</span>}
          </NavLink>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}
