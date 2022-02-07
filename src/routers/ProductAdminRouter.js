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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { ListGroup } from "react-bootstrap";

const columns = [
  {
    name: "Producto",
    selector: (row) => row.title,
  },
  {
    name: "Año",
    selector: (row) => row.year,
  },
  {
    name: "Acción",
    selector: (row) => row.action,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
    action: (
      <div className="d-flex gap-sm">
        <FontAwesomeIcon icon={faEye} />
        <FontAwesomeIcon icon={faEdit} /> <FontAwesomeIcon icon={faTrashAlt} />
      </div>
    ),
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
    action: (
      <div className="d-flex gap-sm">
        <FontAwesomeIcon icon={faEye} />
        <FontAwesomeIcon icon={faEdit} /> <FontAwesomeIcon icon={faTrashAlt} />
      </div>
    ),
  },
];

export const ProductAdminRouter = () => {
  let { path, url } = useRouteMatch();

  return (
    <Router>
      <Container fluid>
        <div className="d-flex flex-column">
          <ListGroup horizontal className="d-flex  p-3">
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
              <DataTable
                columns={columns}
                data={data}
                onRowClicked={(row, event) => {
                  console.log(row);
                }}
              />
            </Route>
            <Route exact path={`${path}/categories`}>
              <h1>Categories of Products</h1>
            </Route>
            <Redirect to={`${path}/list`} />
          </Switch>
        </div>
      </Container>
    </Router>
  );
};
