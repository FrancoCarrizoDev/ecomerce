import { Footer } from 'components/Footer'
import { Menu } from 'components/Menu'
import { Home } from 'pages/Home'
import { Product } from 'pages/Product'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useRouteMatch } from '../../node_modules/react-router-dom/cjs/react-router-dom.min'

export const GlobalRouter = () => {
  const match = useRouteMatch()
  return (
    <Router>
      <div>
        <Menu />

        {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path={match.path}>
            <Home />
          </Route>
          <Route exact path='/about'>
            <h1>About</h1>
          </Route>
          <Route path={`${match.path}users`}>
            <h1>Users</h1>
          </Route>
          <Route exact path={`${match.path}hombre`}>
            <div className='min-vh-100'>
              <Product />
            </div>
          </Route>
          <Route path={`${match.path}hombre/:id`}>
            <div className='min-vh-100'>
              <Product />
            </div>
          </Route>
          <Redirect to='/' />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}
