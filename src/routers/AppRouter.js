import { startCheking } from 'src/actions/auth'
import { Loading } from 'src/components/Loading'
import { Home } from 'src/pages/Home'
import { Login } from 'src/pages/Login'
import { Product } from 'src/pages/Product'
import { Register } from 'src/pages/Register'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { CustomRoute } from './CustomRoute'
import { AdminRouter } from './AdminRouter'
// import { CustomRouteWithAuth } from "./CustomRouteWithAuth";

export const AppRouter = () => {
  const dispatch = useDispatch()
  const { checking } = useSelector((state) => state.rootReducer.loading)
  const { uid } = useSelector((state) => state.rootReducer.auth)

  useEffect(() => {
    if (
      window.localStorage.getItem('token') &&
      window.localStorage.getItem('token') !== 'undefined'
    )
      dispatch(startCheking())
  }, [dispatch])

  return (
    <Router>
      <div>
        {checking && <Loading />}
        <Switch>
          <CustomRoute exact path='/' component={Home} />
          <CustomRoute path={`/hombre`} component={Product} />
          <CustomRoute exact path='hombre/:id' component={Product} />
          {/* <CustomRouteWithAuth
            path="/my-account/:id"
            component={UserPanel}
            uid={!!uid}
          /> */}
          {/* Falta validar que sea el admin */}
          <Route
            path='/my-account'
            render={() => (uid ? <AdminRouter /> : <Redirect to='/login' />)}
          />
          <Route path='/login' render={() => (uid ? <Redirect to='/' /> : <Login />)} />
          <Route path='/register' render={() => (uid ? <Redirect to='/' /> : <Register />)} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  )
}
