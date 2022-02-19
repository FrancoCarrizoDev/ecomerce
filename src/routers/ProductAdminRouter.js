import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from "react-router-dom"
import { useRouteMatch } from "../../node_modules/react-router-dom/cjs/react-router-dom.min"
import { AdminPanelProductCategories } from "src/pages/AdminPanelProductCategories"

export const ProductAdminRouter = () => {
  const { path, url } = useRouteMatch()

  return (
    <Router>
      <div className="w-100 d-flex flex-column categoriesMenuContainer">
        <div className="categoriesMenu">
          <ul className="d-flex flex-row navbar-nav p-2">
            <li className="nav-item">
              <NavLink to={`${url}/create`} className="nav-link">
                Crear
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`${url}/list`} className="nav-link">
                {" "}
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`${url}/list`} className="nav-link">
                Tipos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`${url}/list`} className="nav-link">
                SubTipos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`${url}/categories`} className="nav-link">
                Categorías
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`${url}/list`} className="nav-link">
                Color
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path={`${path}/create`}>
            <h1>Create Product</h1>
          </Route>
          <Route path={`${path}/list`}>
            <h4>Listado de productos</h4>
          </Route>
          <Route exact path={`${path}/categories`}>
            <AdminPanelProductCategories />
          </Route>
          <Redirect to={`${path}/list`} />
        </Switch>
      </div>
    </Router>
  )
}
