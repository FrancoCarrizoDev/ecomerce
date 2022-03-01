import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { useRouteMatch } from '../../node_modules/react-router-dom/cjs/react-router-dom.min'
import { AdminPanelProductCategories } from 'src/pages/AdminPanelProductCategories'
import { useDispatch } from 'react-redux'
import { selectApp } from 'src/actions/appSelected'
import { APPS } from 'src/constants/apps'
import { useEffect } from 'react'
import { AdminPanelProductTypeCategories } from 'src/pages/AdminPanelProductTypeCategories'
import { AdminPanelProductSubTypes } from 'src/pages/AdminPanelProductSubType'
import { AdminPanelType } from 'src/pages/AdminPanelProductType'

export const ProductAdminRouter = () => {
  const { path, url } = useRouteMatch()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(selectApp(APPS.PRODUCTOS.name))
  }, [])

  return (
    <Router>
      <div className='w-100 d-flex flex-column categoriesMenuContainer'>
        <div className='categoriesMenu'>
          <ul className='d-flex flex-row navbar-nav'>
            <li className='nav-item'>
              <NavLink
                to={`${url}/create`}
                className={(isActive) =>
                  !isActive ? ' unselected nav-link' : 'activeNav nav-link'
                }
              >
                Crear
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={`${url}/list`}
                className={(isActive) =>
                  !isActive ? ' unselected nav-link' : 'activeNav nav-link'
                }
              >
                {' '}
                Productos
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={`${url}/product-type`}
                className={(isActive) =>
                  !isActive ? ' unselected nav-link' : 'activeNav nav-link'
                }
              >
                Tipos
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink
                to={`${url}/product-categories`}
                className={(isActive) =>
                  !isActive ? ' unselected nav-link' : 'activeNav nav-link'
                }
              >
                Categorías Por Producto
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path={`${path}/create`}>
            <h1>Create Product</h1>
          </Route>
          <Route path={`${path}/list`}>
            <h4>Listado de productos</h4>
          </Route>
          <Route path={`${path}/product-type`}>
            <AdminPanelType />
          </Route>
          <Route path={`${path}/product-sub-type`}>
            <AdminPanelProductSubTypes />
          </Route>
          <Route path={`${path}/product-type-categories`}>
            <AdminPanelProductTypeCategories />
          </Route>
          <Route path={`${path}/product-categories`}>
            <AdminPanelProductCategories />
          </Route>
          <Redirect to={`${path}/create`} />
        </Switch>
      </div>
    </Router>
  )
}
