import * as types from "./mutations.types";

export default {
  // eslint-disable-next-line no-unused-vars
  [types.SET_LANGUAGE](state, payload) {
    state.language = payload;
    localStorage.setItem("lang", payload);
  },
};
