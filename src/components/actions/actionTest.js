import { types } from "types/types";

export const actionTest = () => ({
  type: types.test,
  payload: {
    test: true,
  },
});
