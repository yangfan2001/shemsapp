import axiosInstance from "./axiosConfig";
import constants, { AddLocationData, ModifyLocationData } from "../constants";
import axios from "axios";

export const getCustomerEnergyPerDay = async (start:Date, end:Date, token:string) => {
    const params = {
        start: start.toISOString(), // Convert Date to ISO string
        end: end.toISOString()       // Convert Date to ISO string
    };
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: params // include query parameters
    };
    return axiosInstance.get(`${constants.ENDPOINT_ENERGY_URL}/customer/day`, config);
}

export const getCustomerEnergyDeviceType = async (start:Date, end:Date) => {
    return axiosInstance.get(`${constants.ENDPOINT_ENERGY_URL}/device/type`, {
        params: {
            start: start.toISOString(), // Convert Date to ISO string
            end: end.toISOString()       // Convert Date to ISO string
        }
    });
}

export const getCustomerEnergyLocationType = async (start:Date, end:Date) => {
    return axiosInstance.get(`${constants.ENDPOINT_ENERGY_URL}/location`, {
        params: {
            start: start.toISOString(), // Convert Date to ISO string
            end: end.toISOString()       // Convert Date to ISO string
        }
    });
}