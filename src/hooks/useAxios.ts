import Axios from "./baseUseAxios";

export const useAxiosGet = (url: string) => {
  return Axios(url, "get");
};

export const useAxiosPost = (url: string, body: object) => {
  return Axios(url, "post", body);
};

export const useAxiosPut = (url: string, body: object) => {
  return Axios(url, "put", body);
};

export const useAxiosDelete = (url: string) => {
  return Axios(url, "delete");
};
