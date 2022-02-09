import { Footer } from "components/Footer"
import { Menu } from "components/Menu"
import { Route } from "react-router-dom"

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
