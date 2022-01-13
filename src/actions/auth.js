import { fetchWithToken } from "services/fetchWithToken";
import login from "services/login";
import Swal from "sweetalert2";
import { types } from "types/types";

const loginAction = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      debugger;
      const response = await login({ email, password });
      const body = await response.json();

      if (response.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(
          loginAction({
            uid: body.user.uid,
            name: body.user.name,
          })
        );
        Swal.fire("Bienvenido!", "Nos alegra tenerte por aqui :)", "success");
      } else {
        Swal.fire("Error", body.msg, "error");
        console.log(body.msg);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Algo salió mal, por favor intente nuevamente más tarde",
        "error"
      );
    }
  };
};

const checkingFinish = () => ({
  type: types.authChekingFinish,
});

export const startCheking = () => {
  return async (dispatch) => {
    try {
      const response = await fetchWithToken("auth/renew");
      const body = await response.json();

      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        loginAction({
          uid: body.user.uid,
          name: body.user.name,
        })
      );
    } catch (error) {
      dispatch(checkingFinish());
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(eventLogout());
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.authLogout,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
