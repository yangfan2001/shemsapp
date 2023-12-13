import React, { useState } from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ListItemButton,
  ListItemIcon,
  Snackbar,
  TextField,
} from "@mui/material";
import { Padding, TryRounded } from "@mui/icons-material";
import { addLocation } from "../services/location";
import { AddLocationData } from "../constants";

function AddLocationCard() {
  const [addDialog, setAddDialog] = useState(false);

  const [streetNum, setStreetNum] = useState("");
  const [streetName, setStreetName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [numBed, setNumBed] = useState("");
  const [numOccupants, setNumOccupants] = useState("");
  // also have startDate & customerID
  const [errorInfo, setErrorInfo] = useState("");
  const [failSnackbar, setFailSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const handleClick = () => {
    setAddDialog(true);
  };

  const handleClose = () => {
    setAddDialog(false);
  };

  const handleSumbmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // data validation
    event.preventDefault();
    if (isNaN(Number(streetNum))) {
      setErrorInfo("Invalid Street Number!");
      setFailSnackbar(true);
      return;
    }
    if (isNaN(Number(squareFeet))) {
      setErrorInfo("Invalid Square Feet!");
      setFailSnackbar(true);
      return;
    }
    if (isNaN(Number(numBed))) {
      setErrorInfo("Invalid Bedroom Number!");
      setFailSnackbar(true);
      return;
    }
    if (isNaN(Number(numOccupants))) {
      setErrorInfo("Invalid Occupant Number!");
      setFailSnackbar(true);
      return;
    }
    if (isNaN(Number(zipCode)) || zipCode.length != 5) {
      setErrorInfo("Invalid Zip Code!");
      setFailSnackbar(true);
      return;
    }
    const postData: AddLocationData = {
      streetNum: Number(streetNum),
      streetName: streetName,
      unitNumber: unitNumber,
      city: city,
      state: state,
      zipCode: zipCode,
      squareFeet: Number(squareFeet),
      numBed: Number(numBed),
      numOccupants: Number(numOccupants),
    };

    const token = sessionStorage.getItem("token");

    if (token) {
      await addLocation(postData, token)
        .then((res) => {
          setSuccessSnackbar(true);
          window.location.href = "/location";
        })
        .catch((error) => {
          setFailSnackbar(true);
        });
    }
  };
  return (
    <>
      <ListItemButton
        style={{ justifyContent: "center", display: "flex" }}
        onClick={handleClick}
      >
        <ListItemIcon style={{ minWidth: "auto" }}>
          <AddLocationAltIcon style={{ fontSize: "80" }} />
        </ListItemIcon>
      </ListItemButton>
      <Dialog open={addDialog} onClose={handleClose}>
        <DialogTitle>Adding My New Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new location, please fill out the form and click 'Add
            Location'.
          </DialogContentText>
          <form onSubmit={handleSumbmit}>
            <Grid container>
              <Grid item xs={6} padding={1}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  margin="dense"
                  id="street_num"
                  label="Street Number"
                  variant="standard"
                  onChange={(e) => {
                    setStreetNum(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={6} padding={1}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="street_name"
                  label="Street Name"
                  variant="standard"
                  onChange={(e) => {
                    setStreetName(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={12} padding={1}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="unit_number"
                  label="Unit Number"
                  variant="standard"
                  onChange={(e) => {
                    setUnitNumber(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4} padding={1}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  variant="standard"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4} padding={1}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  variant="standard"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4} padding={1}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="zip_code"
                  label="Zip Code"
                  variant="standard"
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4} padding={1}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="square_feet"
                  label="Square Feet"
                  variant="standard"
                  onChange={(e) => {
                    setSquareFeet(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4} padding={1}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="num_beds"
                  label="Bedrooms"
                  variant="standard"
                  onChange={(e) => {
                    setNumBed(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4} padding={1}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="num_occupants"
                  label="Occupants"
                  variant="standard"
                  onChange={(e) => {
                    setNumOccupants(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={6} padding={1}>
                <Button type="submit" variant="contained" fullWidth>
                  Add Location
                </Button>
              </Grid>
              <Grid xs={6} padding={1}>
                <Button onClick={handleClose} variant="outlined" fullWidth>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={failSnackbar}
        autoHideDuration={5000}
        onClose={() => {
          setFailSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setFailSnackbar(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorInfo}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={successSnackbar}
        autoHideDuration={1000}
        onClose={() => {
          setSuccessSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setSuccessSnackbar(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Adding Location Success!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddLocationCard;
