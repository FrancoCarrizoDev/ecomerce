import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { useRouteMatch } from '../../node_modules/react-router-dom/cjs/react-router-dom.min'
import { GlobalCategories } from 'src/pages/AdminPanel/Products/GlobalCategories'
import { useDispatch } from 'react-redux'
import { selectApp } from 'src/actions/appSelected'
import { APPS } from 'src/constants/apps'
import { useEffect } from 'react'
import { ProductTypeCategories } from 'src/pages/AdminPanel/Products/ProductTypeCategories'
import { ProductSubTypes } from 'src/pages/AdminPanel/Products/ProductSubType'
import { ProductType } from 'src/pages/AdminPanel/Products/ProductType'
import { CreateProduct } from 'src/pages/AdminPanel/Products/CreateProduct'
import { ProductList } from 'src/pages/AdminPanel/Products/ProductList'

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
                id='product'
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
                Listado
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
                Categorías Globales
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path={`${path}/create`}>
            <CreateProduct />
          </Route>
          <Route path={`${path}/list`}>
            <ProductList />
          </Route>
          <Route path={`${path}/edit/:id`}>
            <h1>Holi</h1>
          </Route>
          <Route path={`${path}/product-type`}>
            <ProductType />
          </Route>
          <Route path={`${path}/product-sub-type`}>
            <ProductSubTypes />
          </Route>
          <Route path={`${path}/product-type-categories`}>
            <ProductTypeCategories />
          </Route>
          <Route path={`${path}/product-categories`}>
            <GlobalCategories />
          </Route>
          <Redirect to={`${path}/create`} />
        </Switch>
      </div>
    </Router>
  )
}
