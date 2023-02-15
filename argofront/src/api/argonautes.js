import axios from "axios";
import { config } from "../config";

// enregistrement d'une annonce
export const saveOneArgo = (datas) => {
  return axios
    .post(config.api_url + "/api/v1/argo/add", datas)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

//avoir toutes les annonces
export const getAllArgo = () => {
  return axios
    .get(config.api_url + "/api/v1/argos")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
