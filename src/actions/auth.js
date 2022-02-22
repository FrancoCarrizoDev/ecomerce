import { fetchWithToken } from 'src/services/fetchWithToken'
import login from 'src/services/login'
import { types } from 'src/types/types'
import { openModalFailed, openModalSuccess } from 'src/helpers/sweetAlert'

const loginAction = (user) => ({
  type: types.authLogin,
  payload: user,
})

const adminLoginAction = (user) => ({
  type: types.authAdminLogin,
  payload: user,
})

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart())
      const response = await login({ email, password })
      const body = await response.json()

      if (response.ok) {
        localStorage.setItem('token', body.token)
        localStorage.setItem('token-init-date', new Date().getTime())
        if (body.user.role) {
          dispatch(
            adminLoginAction({
              uid: body.user.uid,
              name: body.user.name,
              role: body.user.role,
            })
          )
        } else {
          dispatch(
            loginAction({
              uid: body.user.uid,
              name: body.user.name,
            })
          )
        }

        openModalSuccess('Bienvenido!', 'Nos alegra tenerte por aqui :)')
      } else {
        openModalFailed(body.msg)
        console.log(body.msg)
      }
      dispatch(loadingStop())
    } catch (error) {
      openModalFailed('Algo salió mal, por favor intente nuevamente más tarde')
      dispatch(loadingStop())
    }
  }
}

const checkingFinish = () => ({
  type: types.authChekingFinish,
})

// TODO van en otro lado
const loadingStart = () => ({
  type: types.startLoading,
})

const loadingStop = () => ({
  type: types.stopLoading,
})

export const startCheking = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart())
      const response = await fetchWithToken('auth/renew')
      const body = await response.json()

      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(
        loginAction({
          uid: body.user.uid,
          name: body.user.name,
        })
      )
      dispatch(loadingStop())
    } catch (error) {
      dispatch(startLogout())
      dispatch(checkingFinish())
      dispatch(loadingStop())
    }
  }
}

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(logout())
  }
}

export const logout = () => ({
  type: types.authLogout,
})
