import * as types from "./mutations.types";

export default {
  // eslint-disable-next-line no-unused-vars
  [types.SET_TYPE_PRODUCTS](state, payload) {
    state.type_products = payload;
  },

  [types.SET_ADDRESS](state, payload) {
    state.address = payload;
  },
};
