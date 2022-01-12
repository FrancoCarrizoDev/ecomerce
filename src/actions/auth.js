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
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        loginAction({
          uid: response.user.uid,
          name: response.user.name,
        })
      );
      Swal.fire("Bienvenido!", "Nos alegra tenerte por aqui :)", "success");
    } catch (error) {
      Swal.fire("Error", error.toString(), "error");
      console.log(error);
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
