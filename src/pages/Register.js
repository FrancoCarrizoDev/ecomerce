import { startLogin } from "actions/auth";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  useHistory,
  useLocation,
} from "../../node_modules/react-router-dom/cjs/react-router-dom.min";
import { useField } from "../hooks/useField";
import logo from "../images/owl.png";
import * as yup from "yup";

yup.setLocale({
  mixed: {
    default: "Error",
    required: "El campo ${path} es requerido",
  },
  string: {
    email: "El mail es inválido",
  },
});

const userSchema = yup.object().shape({
  name: yup.string().required().min(3).max(15),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15),
});

export const Register = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.rootReducer);
  const [errors, setErrors] = useState(null);

  const name = useField({ type: "text" });
  const email = useField({ type: "text" });
  const password = useField({ type: "password" });
  const password2 = useField({ type: "password" });
  const img = useField({ type: "file" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      name: name.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    };

    const isValid = await userSchema
      .validate(formData)
      .then(function () {
        setErrors(null);
      })
      .catch(function (err) {
        setErrors(err.errors);
      });
    console.log(errors);
    console.log(formData);
    // dispatch(startLogin(email.value, password.value));
  };

  useEffect(() => {
    if (auth.uid) {
      history.replace(from);
    }
  }, [auth.uid, from, history]);

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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control placeholder="Jhon Doe" size="sm" {...name} />
          </Form.Group>
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
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repite la Password</Form.Label>
            <Form.Control placeholder="******" size="sm" {...password2} />
            <Form.Text className="text-muted">
              <small>Nadie de OwlShip va a pedirte nunca tus datos.</small>
            </Form.Text>
          </Form.Group>

          {errors && (
            <Form.Text className="text-danger mb-3">
              <small>Error - {errors[0]} ⛔ </small>
            </Form.Text>
          )}

          <div className="form-group mb-3">
            <label htmlFor="exampleFormControlFile1">Imagen</label>
            <input
              className="form-control-file btn-sm ps-0 "
              id="exampleFormControlFile1"
              {...img}
            />
            <Form.Text className="text-muted">
              <small>Si quieres puedes subir una imagen tuya :)</small>
            </Form.Text>
          </div>

          <Form.Group className="d-flex flex-column gap-sm mb-3">
            <Button variant="dark" type="submit" size="sm">
              Crear
            </Button>
            <NavLink className="btn btn-light btn-sm" to="/">
              Volver
            </NavLink>
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-primary d-flex justify-content-center">
              <a href="#id" className="">
                Necesito ayuda
              </a>
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
