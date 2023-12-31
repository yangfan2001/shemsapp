import axiosInstance from "./axiosConfig";
import constants from "../constants";
import axios from "axios";

export const getAllDevices = async () => {
  return axiosInstance.get(`${constants.ENDPOINT_DEVICE_URL}/all`);
}

export const getAllDeviceModels = async () => {
    return axiosInstance.get(`${constants.ENDPOINT_DEVICE_URL}/model/all`);
}

export const postAddDevice = async (location_id:string, model_id:string, tag:string) => {
    return axiosInstance.post(`${constants.ENDPOINT_DEVICE_URL}/add`, {
        location_id,
        model_id,
        tag
    });
}

export const deleteDevice = async (device_id:string) => {
    return axiosInstance.post(`${constants.ENDPOINT_DEVICE_URL}/delete`, {
        device_id
    });
}

export const updateDevice = async (device_id:string,tag:string) => {
    return axiosInstance.post(`${constants.ENDPOINT_DEVICE_URL}/update`, {
        device_id,
        tag
    });
}

export const getDeviceEvent =async (device_id:number, date:Date) => {
    const params = {
        device_id: device_id,
        date:date
    }
    return axiosInstance.get(`${constants.ENDPOINT_DEVICE_URL}/events`, {params:params})
}