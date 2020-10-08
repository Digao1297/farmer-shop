import * as types from "./mutations.types";
import { http, urls } from "../../../services";

export const actionSetTypeProducts = async ({ commit }, payload) => {
  commit(types.SET_TYPE_PRODUCTS, payload);
};

export const actionLoad = async ({ dispatch }) => {
  await http
    .GET(urls.typeProduct)
    .then((response) => {
      console.log(response.data);
      dispatch("actionSetTypeProducts", response.data);
    })
    .catch((error) => console.log(error));
};

export const actionCreate = async ({ dispatch }, payload) => {
  await http
    .POST(urls.typeProduct, payload)
    .then((response) => {
      console.log(response.data);

      dispatch("actionLoad");
    })
    .catch((error) => console.log(error));
};

export const actionEdit = async ({ dispatch }, payload) => {
  await http
    .PUT(urls.typeProduct, payload.id, {
      name: payload.name,
    })
    .then(() => {
      dispatch("actionLoad");
    })
    .catch((error) => console.log(error));
};
export const actionDelete = async ({ dispatch }, payload) => {
  await http
    .DELETE(urls.typeProduct, payload.id)
    .then(() => {
      dispatch("actionLoad");
    })
    .catch((error) => console.log(error));
};

export const actionSetAddress = async ({ commit }, payload) => {
  commit(types.SET_ADDRESS, payload);
};

export const actionLoadAddress = async ({ dispatch }) => {
  await http
    .GET(urls.address)
    .then((response) => {
      console.log(response.data);
      dispatch("actionSetAddress", response.data);
    })
    .catch((error) => console.log(error));
};

export const actionCreateAddress = async ({ dispatch }, payload) => {
  await http
    .POST(urls.address, payload)
    .then((response) => {
      console.log(response.data);

      dispatch("actionLoadAddress");
    })
    .catch((error) => console.log(error));
};

export const actionEditAddress = async ({ dispatch }, payload) => {
  await http
    .PUT(urls.address, payload.id, payload)
    .then(() => {
      dispatch("actionLoadAddress");
    })
    .catch((error) => console.log(error));
};
export const actionDeleteAddress = async ({ dispatch }, payload) => {
  await http
    .DELETE(urls.address, payload.id)
    .then(() => {
      dispatch("actionLoadAddress");
    })
    .catch((error) => console.log(error));
};
