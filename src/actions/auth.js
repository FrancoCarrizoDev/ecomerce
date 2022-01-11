import login from "services/login";
import Swal from "sweetalert2";
import { types } from "types/types";

const loginAction = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const response = await login({ email, password });

    if (response) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("token-init-datre", new Date().getTime());
      dispatch(
        loginAction({
          uid: response.user.uid,
          name: response.user.name,
        })
      );
    } else {
      debugger;
      Swal.fire("Error", response.msg, "error");
    }
  };
};
