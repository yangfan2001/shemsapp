import React, { useEffect, useState } from "react";
import { getCustomerLocation } from "../../services/location";
import LocationCard from "../../components/LocationCard";
import { Grid, Paper } from "@mui/material";
import AddLocationCard from "../../components/AddLocationCard";
import ModifyLocationCard from "../../components/ModifyLocationCard";
import { Location } from "../../constants";

function MyLocationPage() {
  const [locations, setLocations] = useState([]);
  const [modifyLocationIndex, setModifyLocationIndex] = useState<number | null>(
    null
  );
  const [modifyLocationID, setModifyLocationID] = useState<number | null>(null);
  const [openModifyCard, setOpenModifyCard] = useState(false);
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
    <>
      <Grid container padding={2}>
        {locations.map((location: Location, index) => (
          <Paper sx={{ padding: 2, margin: "20px", width: "40vh" }}>
            <LocationCard
              locationIndex={index + 1}
              locationID={location.location_id}
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
              setModifyLocationIndex={setModifyLocationIndex}
              setOpenModifyCard={setOpenModifyCard}
              setModifyLocationID={setModifyLocationID}
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

      <ModifyLocationCard
        openCard={openModifyCard}
        modifyIndex={modifyLocationIndex}
        modifyID={modifyLocationID}
        setOpenModifyCard={setOpenModifyCard}
      />
    </>
  );
}

export default MyLocationPage;
