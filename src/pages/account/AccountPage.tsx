import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { User } from "./CustomerInfo";
import { getCustomerInfo } from "../../services/customer";
import { getCustomerLocation } from "../../services/location";
import Loading from "../../components/Loading";
import { useSnackbar } from "../../components/SnackbarProvier";
import { useNavigate } from "react-router-dom";
interface ReadOnlyTextFieldProps {
  label: string;
  value: string;
}

const ReadOnlyTextField: React.FC<ReadOnlyTextFieldProps> = ({
  label,
  value,
}) => (
  <TextField
    label={label}
    value={value}
    InputProps={{
      readOnly: true,
    }}
    variant="filled"
    fullWidth
    margin="normal"
  />
);

const AccountInfoPage: React.FC = () => {
  const [user, setUser] = useState<User>({
    customer_id: "",
    first_name: "",
    last_name: "",
    email: "",
    billing_street_num: "",
    billing_street_name: "",
    billing_unit_number: "",
    billing_city: "",
    billing_state: "",
    billing_zipcode: "",
    devices: [],
    locations: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const showSnackbar = useSnackbar();

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const [userInfoResponse, locationsResponse] = await Promise.all([
          getCustomerInfo(),
          getCustomerLocation(),
        ]);

        const newUser = {
          ...userInfoResponse.data,
          locations: locationsResponse.data, // Assuming locationsResponse has data field
          devices: [], // Populate this as needed
        };

        console.log(locationsResponse.data);
        setUser(newUser as User);
      } catch (error) {
        console.error("Failed to fetch customer info:", error);
        showSnackbar("Failed to fetch customer info", "error");
        // Handle errors here
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerInfo();
  }, []); // Empty dependency array means this effect runs once on mount

  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2, margin: "20px 0" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ReadOnlyTextField label="First Name" value={user.first_name} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ReadOnlyTextField label="Last Name" value={user.last_name} />
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <ReadOnlyTextField label="Email" value={user.email} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReadOnlyTextField
              label="Street Number"
              value={user.billing_street_num}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReadOnlyTextField
              label="Street Name"
              value={user.billing_street_name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReadOnlyTextField
              label="Unit Number"
              value={user.billing_unit_number}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReadOnlyTextField label="City" value={user.billing_city} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReadOnlyTextField label="State" value={user.billing_state} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ReadOnlyTextField label="Zip Code" value={user.billing_zipcode} />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, margin: "20px 0" }}>
        <Grid container spacing={2}>
          {user.devices.map((device, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={2} sx={{ padding: 1, margin: "8px 0" }}>
                <ReadOnlyTextField label="Device Name" value={device.name} />
                <ReadOnlyTextField label="Device ID" value={device.id} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, margin: "20px 0" }}>
        <Grid container spacing={2}>
          {user.locations.map((location, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={2} sx={{ padding: 1, margin: "8px 0" }}>
                <ReadOnlyTextField
                  label="Location Name"
                  value={location.name}
                />
                <ReadOnlyTextField label="Location ID" value={location.id} />
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid>
          <Button
            onClick={() => {
              navigate("/location");
            }}
          >
            To My Locations
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AccountInfoPage;
