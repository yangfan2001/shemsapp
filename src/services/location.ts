import axiosInstance from "./axiosConfig";
import constants from "../constants";

export const getCustomerLocation = async () => {
  return axiosInstance.get(`${constants.ENDPOINT_LOCATION_URL}/all`);
}
