import { Footer } from 'src/components/Footer'
import { Menu } from 'src/components/Menu'
import { Route } from 'react-router-dom'

export const CustomRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Menu />
          <Component {...props} />
          <Footer />
        </>
      )}
    />
  )
}
