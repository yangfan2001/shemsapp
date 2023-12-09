import constants from '../constants';
import axios from 'axios';

export const login = async (email: string, password: string) => {
    return await axios.post(`${constants.ENDPOINT_AUTH_URL}/login`, { email, password });
}


type RegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    billingStreetNum: number;
    billingStreetName: string;
    billingUnitNumber: string;
    billingCity: string;
    billingState: string;
    billingZipcode: string;
  };

export const register = async ({
    firstName,
    lastName,
    email,
    password,
    billingStreetNum,
    billingStreetName,
    billingUnitNumber,
    billingCity,
    billingState,
    billingZipcode
  }: RegisterData) => {
    const params = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      billing_street_num: billingStreetNum,
      billing_street_name: billingStreetName,
      billing_unit_number: billingUnitNumber,
      billing_city: billingCity,
      billing_state: billingState,
      billing_zipcode: billingZipcode
    };
  
    return axios.post(`${constants.ENDPOINT_AUTH_URL}/register`, params);
  };