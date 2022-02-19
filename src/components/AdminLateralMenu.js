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
import logo from "../images/owl.png"

export const AdminLateralMenu = ({ url }) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(true)

  return (
    <div className="lateralMenuContainer">
      <div className="paddingLateralMenuContainer d-flex justify-content-center align-items-center gap-sm ">
        {isMenuExpanded && (
          <img
            src={logo}
            width="25"
            height="25"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        )}
        {isMenuExpanded && <h5 className="mb-0">OwlShip</h5>}

        <button
          className="btn btn-default btn-circle btn-circle-border"
          onClick={() => setIsMenuExpanded(!isMenuExpanded)}
        >
          <FontAwesomeIcon icon={isMenuExpanded ? faChevronLeft : faBars} size="sm" />
        </button>
      </div>

      <ListGroup as="ul" className={!isMenuExpanded ? "adminLateralMenuChildCenter" : ""}>
        <ListGroup.Item as="li">
          <NavLink
            to={`${url}/home`}
            className={(isActive) => (!isActive ? " unselected" : "routeSelected")}
          >
            <div className="containerIcons">
              <FontAwesomeIcon icon={faHome} />
              {isMenuExpanded && <span>Inicio</span>}
            </div>
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item as="li" to="/">
          <NavLink
            to={`${url}/products`}
            className={(isActive) => (!isActive ? " unselected" : "routeSelected")}
          >
            <div className="containerIcons">
              <FontAwesomeIcon icon={faTshirt} />
              {isMenuExpanded && <span>Productos</span>}
            </div>
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <NavLink
            to={`${url}/pedidos`}
            className={(isActive) => (!isActive ? " unselected" : "routeSelected")}
          >
            <div className="containerIcons">
              <FontAwesomeIcon icon={faBoxOpen} />
              {isMenuExpanded && <span>Pedidos</span>}
            </div>
          </NavLink>
        </ListGroup.Item>

        <ListGroup.Item as="li">
          <NavLink
            to={`${url}/banners`}
            className={(isActive) => (!isActive ? " unselected" : "routeSelected")}
          >
            <div className="containerIcons">
              <FontAwesomeIcon icon={faImages} />
              {isMenuExpanded && <span>Banners</span>}
            </div>
          </NavLink>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}
