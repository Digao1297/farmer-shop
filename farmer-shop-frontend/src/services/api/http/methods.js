import { http } from "./axios";

class CallApi {
  async GET(_url, _id = "") {
    return await http.get(`${_url}/${_id}`);
  }

  async PUT(_url, _id, _data) {
    return await http.put(`${_url}/${_id}`, _data);
  }

  async POST(_url, _data) {
    return await http.post(_url, _data);
  }

  async DELETE(_url, _id) {
    await http.delete(`${_url}/${_id}`);
  }

  async PATCH(_url, _token) {
    await http.patch(`${_url}/${_token}`);
  }
}
export const callApi = new CallApi();
