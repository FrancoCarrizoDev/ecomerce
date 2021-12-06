import { types } from "../types/types";

export const testReducer = (state = {}, action) => {
  switch (action.type) {
    case types.test:
      return {
        action,
      };
    default:
      return state;
  }
};
