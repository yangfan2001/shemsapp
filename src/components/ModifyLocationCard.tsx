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
import { Padding, PortableWifiOffSharp, TryRounded } from "@mui/icons-material";

interface Props {
  openCard: boolean;
  modifyIndex: number | null;
  setOpenModifyCard: (open: boolean) => void;
}

function ModifyLocationCard(Props: Props) {
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

  const handleClose = () => {
    Props.setOpenModifyCard(false);
  };

  return (
    <>
      <Dialog open={Props.openCard} onClose={handleClose}>
        <DialogTitle>Modify My Location # {Props.modifyIndex}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new location, please fill out the form and click 'Add
            Location'.
          </DialogContentText>
          <form>
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
    </>
  );
}

export default ModifyLocationCard;
