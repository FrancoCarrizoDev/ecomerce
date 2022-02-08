import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import { useRouteMatch } from "../../node_modules/react-router-dom/cjs/react-router-dom.min";
import DataTable from "react-data-table-component";
import Container from "../../node_modules/react-bootstrap/esm/Container";
import { ListGroup } from "react-bootstrap";
import { AdminPanelProductCategories } from "pages/AdminPanelProductCategories";

export const ProductAdminRouter = () => {
  let { path, url } = useRouteMatch();

  return (
    <Router>
      <Container fluid>
        <div className="d-flex flex-column">
          <ListGroup horizontal className="p-3">
            <ListGroup.Item>
              <NavLink to={`${url}/create`}>Crear</NavLink>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavLink to={`${url}/list`}> Productos</NavLink>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavLink to={`${url}/list`}>Tipos</NavLink>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavLink to={`${url}/list`}>SubTipos</NavLink>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavLink to={`${url}/categories`}>Categorías</NavLink>
            </ListGroup.Item>
            <ListGroup.Item>
              <NavLink to={`${url}/list`}>Color</NavLink>
            </ListGroup.Item>
          </ListGroup>

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
      </Container>
    </Router>
  );
};
