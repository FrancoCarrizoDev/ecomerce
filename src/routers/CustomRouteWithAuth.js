import { Footer } from "components/Footer"
import { Menu } from "components/Menu"
import { Redirect, Route } from "react-router-dom"

export const CustomRouteWithAuth = ({ uid = null, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        uid ? (
          <>
            <Menu />
            <Component {...props} />
            <Footer />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}
