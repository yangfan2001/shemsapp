import axiosInstance from "./axiosConfig";
import constants, { AddLocationData, ModifyLocationData } from "../constants";

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

export const getCustomerEnergyLocationDeviceType = async (location_id:Number|null, start:Date, end:Date) => {
    return axiosInstance.get(`${constants.ENDPOINT_ENERGY_URL}/location/device_type`, {
        params: {
            location_id:location_id,
            start: start.toISOString(), // Convert Date to ISO string
            end: end.toISOString()       // Convert Date to ISO string
        }
    });
}

export const getCustomerEnergyLocationType = async (start:Date, end:Date) => {
    return axiosInstance.get(`${constants.ENDPOINT_ENERGY_URL}/location/pie`, {
        params: {
            start: start.toISOString(), // Convert Date to ISO string
            end: end.toISOString()       // Convert Date to ISO string
        }
    });
}

export const getCustomerEnergyPerLocationPerDay = async (start:Date, end:Date, token:string) => {
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
    return axiosInstance.get(`${constants.ENDPOINT_ENERGY_URL}/location`, config);
}

export const getEnergyOfAllDevices = async (start:Date, end:Date) => {
    return axiosInstance.get(`${constants.ENDPOINT_ENERGY_URL}/device/all`, {
        params: {
            start: start.toISOString(), // Convert Date to ISO string
            end: end.toISOString()       // Convert Date to ISO string
        }
    });
}

export const getEnergyPerDayByDeviceId = async (device_id:string,start:Date, end:Date) => {
    return axiosInstance.get(`${constants.ENDPOINT_ENERGY_URL}/device/day`, {
        params: {
            device_id: device_id,
            start: start.toISOString(), // Convert Date to ISO string
            end: end.toISOString()       // Convert Date to ISO string
        }
    });
}



export const getSimilarLocationEnergy = async (location_id:Number|null, start:Date, end:Date) => {
    return axiosInstance.get(`${constants.ENDPOINT_ENERGY_URL}/location/similar`, {
        params: {
            location_id:location_id,
            start: start.toISOString(), // Convert Date to ISO string
            end: end.toISOString()       // Convert Date to ISO string
        }
    });
}