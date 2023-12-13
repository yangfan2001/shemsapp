import React, { useEffect, useState } from "react";
import { getCustomerLocation } from "../../services/location";
import LocationCard from "../../components/LocationCard";
import { Grid, Paper } from "@mui/material";
import AddLocationCard from "../../components/AddLocationCard";

type Location = {
  customer_id: number;
  location_id: number;
  location_city: string;
  location_state: string;
  location_zipcode: string;
  location_street_num: number;
  location_street_name: string;
  location_unit_number: string;
  square_feet: number;
  num_bedrooms: number;
  num_occupants: number;
  start_date: string;
};

function MyLocationPage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getCustomerLocation();
        setLocations(response.data);
        console.log(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Grid container padding={2}>
      {locations.map((location: Location, index) => (
        <Paper sx={{ padding: 2, margin: "20px", width: "40vh" }}>
          <LocationCard
            locationIndex={index + 1}
            streetNum={location.location_street_num}
            streetName={location.location_street_name}
            unitNum={location.location_unit_number}
            city={location.location_city}
            state={location.location_state}
            zipCode={location.location_zipcode}
            squareFeet={location.square_feet}
            numBed={location.num_bedrooms}
            numOccupant={location.num_occupants}
            startDate={location.start_date}
            monthlyBill={51}
            monthlyEnergy={100.4}
          ></LocationCard>
        </Paper>
      ))}
      <Paper
        sx={{
          padding: 2,
          margin: "20px", // Adjusted for centering horizontally
          width: "40vh",
          display: "flex", // Enable Flexbox
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
        }}
      >
        <AddLocationCard />
      </Paper>
    </Grid>
  );
}

export default MyLocationPage;
