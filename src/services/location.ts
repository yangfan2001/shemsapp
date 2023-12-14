import axiosInstance from "./axiosConfig";
import constants, { AddLocationData, ModifyLocationData } from "../constants";

export const getCustomerLocation = async () => {
  return axiosInstance.get(`${constants.ENDPOINT_LOCATION_URL}/all`);
}


export const addLocation = async (data: AddLocationData, token: string, email:string) => {
  const params = {
    location_street_num: data.streetNum,
    location_street_name: data.streetName,
    location_unit_number: data.unitNumber,
    location_city: data.city,
    location_state: data.state,
    location_zip_code: data.zipCode,
    square_feet: data.squareFeet,
    num_bedrooms: data.numBed,
    num_occupants: data.numOccupants,
    email:email
  }
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axiosInstance.post(`${constants.ENDPOINT_LOCATION_URL}/add`, params, config);
}

export const modifyLocation = async (data: ModifyLocationData, token: string) => {
  const params = {
    location_id: data.locationID,
    square_feet: data.squareFeet,
    num_bedrooms: data.numBed,
    num_occupants: data.numOccupants,
  }
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axiosInstance.put(`${constants.ENDPOINT_LOCATION_URL}/modify`, params, config)
}

export const deleteLocation =async (deleteIndex:number, token:string) => {
  const params = { location_id: deleteIndex };
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axiosInstance.put(`${constants.ENDPOINT_LOCATION_URL}/delete`, params, config);
}