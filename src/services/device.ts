import axiosInstance from "./axiosConfig";
import constants from "../constants";

export const getAllDevices = async () => {
  return axiosInstance.get(`${constants.ENDPOINT_DEVICE_URL}/all`);
}