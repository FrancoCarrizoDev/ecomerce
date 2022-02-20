const { types } = require("src/types/types")

const selectAppAction = (appSelected = "") => ({
  type: types.appSelected,
  payload: appSelected,
})

export const selectApp = (app) => {
  return async (dispatch) => {
    dispatch(selectAppAction(app))
  }
}
