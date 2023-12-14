 type UserDevice = {
    device_id: string; // Unique identifier for the device
    model_name: string; // The name of the device
    // ...other properties related to the device
  };
  
  type UserLocation = {
    location_id: string; // Unique identifier for the location
    name: string; // The name of the location
    location_steet: string;
    location_city: string;
    location_state: string;
    location_zipcode: string;
    location_street_name: string;
    location_street_num: Number;
    location_unit_number: string;
    // ...other properties related to the location
  };
  
  export type User = {
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    billing_street_num: string;
    billing_street_name: string;
    billing_unit_number: string;
    billing_city: string;
    billing_state: string;
    billing_zipcode: string;
    locations: UserLocation[]; // Optional, as it may not always be present
    devices: UserDevice[]; // Optional, as it may not always be present
  };
  