import * as types from "./mutations.types";

export const actionSetLanguage = async ({ commit }, payload) => {
  commit(types.SET_LANGUAGE, payload);
};
