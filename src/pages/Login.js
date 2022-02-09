import { startLogin } from "actions/auth"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { useField } from "../hooks/useField"
import logo from "../images/owl.png"

export const Login = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector((state) => state.rootReducer)
  console.log(auth)

  const email = useField({ type: "text" })
  const password = useField({ type: "password" })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(startLogin(email.value, password.value))
  }

  return (
    <div className="loginContainer">
      <div className="loginFormContainer border shadow-sm rounded-3 p-5">
        <div className="d-flex flex-column justify-content-center">
          <span className="d-flex justify-content-center">
            <img
              src={logo}
              width="40"
              height="40"
              className="mb-2"
              alt="React Bootstrap logo"
            />
          </span>
          <h4 className="mb-3 text-center fw-bold">
            ¡Hola! Ingresá tus datos.
          </h4>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="jhondoe@gmail.com"
              size="sm"
              {...email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="******" size="sm" {...password} />
            <Form.Text className="text-muted">
              <small>Nadie de OwlShip va a pedirte nunca tus datos.</small>
            </Form.Text>
          </Form.Group>
          {/* <Form.Group
            className="mb-3 form-control-sm ps-0"
            controlId="formBasicCheckbox"
          >
            <Form.Check type="checkbox" label="Recordarme" />
          </Form.Group> */}
          <Form.Group className="d-flex flex-column gap-sm mb-3">
            <Button variant="dark" type="submit" size="sm">
              Entrar
            </Button>
            <NavLink className="btn btn-light btn-sm" to="/register">
              Crear cuenta
            </NavLink>
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-primary d-flex justify-content-center">
              <a href="#id" className="">
                Necesito ayuda para ingresar
              </a>
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}
