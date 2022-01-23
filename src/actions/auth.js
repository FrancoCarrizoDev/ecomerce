import { fetchWithToken } from "services/fetchWithToken";
import login from "services/login";
import Swal from "sweetalert2";
import { types } from "types/types";

const loginAction = (user) => ({
  type: types.authLogin,
  payload: user,
});

const adminLoginAction = (user) => ({
  type: types.authAdminLogin,
  payload: user,
});

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const response = await login({ email, password });
      const body = await response.json();

      if (response.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        if (!!body.user.role) {
          dispatch(
            adminLoginAction({
              uid: body.user.uid,
              name: body.user.name,
              role: body.user.role,
            })
          );
        } else {
          dispatch(
            loginAction({
              uid: body.user.uid,
              name: body.user.name,
            })
          );
        }

        Swal.fire("Bienvenido!", "Nos alegra tenerte por aqui :)", "success");
      } else {
        Swal.fire("Error", body.msg, "error");
        console.log(body.msg);
      }
      dispatch(loadingStop());
    } catch (error) {
      Swal.fire(
        "Error",
        "Algo salió mal, por favor intente nuevamente más tarde",
        "error"
      );
      dispatch(loadingStop());
    }
  };
};

const checkingFinish = () => ({
  type: types.authChekingFinish,
});

// TODO van en otro lado
const loadingStart = () => ({
  type: types.startLoading,
});

const loadingStop = () => ({
  type: types.stopLoading,
});

export const startCheking = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
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
      dispatch(loadingStop());
    } catch (error) {
      dispatch(startLogout());
      dispatch(checkingFinish());
      dispatch(loadingStop());
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.authLogout,
});
