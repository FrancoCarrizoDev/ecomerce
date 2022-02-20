import { AdminLateralMenu } from 'src/components/AdminLateralMenu'
import { AdminPanel } from 'src/pages/AdminPanel'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useRouteMatch } from '../../node_modules/react-router-dom/cjs/react-router-dom.min'
import { ProductAdminRouter } from './ProductAdminRouter'
import { AdminTopMenu } from 'src/components/AdminTopMenu'

export const AdminRouter = () => {
  const { path, url } = useRouteMatch()

  return (
    <Router>
      <div className='adminRouterContainer'>
        <AdminLateralMenu url={url} />
        <AdminTopMenu />
        <Switch>
          <Route path={`${path}/home`}>
            <AdminPanel />
          </Route>
          <Route path={`${path}/products`}>
            <ProductAdminRouter />
          </Route>
          <Redirect to={`${path}/home`} />
        </Switch>
      </div>
    </Router>
  )
}
