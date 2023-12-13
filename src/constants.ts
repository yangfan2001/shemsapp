const ENDPOINT_URL = 'http://127.0.0.1:5000';
export default {
    ENDPOINT_URL: ENDPOINT_URL,
    ENDPOINT_AUTH_URL: `${ENDPOINT_URL}/auth`,
    ENDPOINT_CUSTOMER_URL: `${ENDPOINT_URL}/customer`,
    ENDPOINT_LOCATION_URL: `${ENDPOINT_URL}/location`, 
    ENDPOINT_DEVICE_URL: `${ENDPOINT_URL}/device`,
}

export type AddLocationData = {
    streetNum: number;
    streetName: string;
    unitNumber: string;
    city: string;
    state: string;
    zipCode: string;
    squareFeet: number;
    numBed: number;
    numOccupants: number;
  }