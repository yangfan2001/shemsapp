import axiosInstance from "./axiosConfig";
import constants from "../constants";

export const getCustomerPriceLocationType = async (start:Date, end:Date) => {
    return axiosInstance.get(`${constants.ENDPOINT_PRICE_URL}/location/pie`, {
        params: {
            start: start.toISOString(), // Convert Date to ISO string
            end: end.toISOString()       // Convert Date to ISO string
        }
    });
}

export const getCustomerPriceDeviceType = async (start:Date, end:Date) => {
    return axiosInstance.get(`${constants.ENDPOINT_PRICE_URL}/device-type`, {
        params: {
            start: start.toISOString(), // Convert Date to ISO string
            end: end.toISOString()       // Convert Date to ISO string
        }
    });
}
