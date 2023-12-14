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
import { ModifyLocationData } from "../constants";
import { deleteLocation, modifyLocation } from "../services/location";
import { blueGrey } from "@mui/material/colors";

interface Props {
  openCard: boolean;
  modifyIndex: number | null;
  modifyID: number | null;
  setOpenModifyCard: (open: boolean) => void;
}

function ModifyLocationCard(Props: Props) {
  const [squareFeet, setSquareFeet] = useState("");
  const [numBed, setNumBed] = useState("");
  const [numOccupants, setNumOccupants] = useState("");
  // also have startDate & customerID
  const [errorInfo, setErrorInfo] = useState("");
  const [failSnackbar, setFailSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // function for handling modify location
    // data validation
    event.preventDefault();
    if (
      squareFeet.length == 0 &&
      numBed.length == 0 &&
      numOccupants.length == 0
    ) {
      setErrorInfo("Please specify the changes.");
      setFailSnackbar(true);
      return;
    }
    if (
      squareFeet.length != 0 &&
      (isNaN(Number(squareFeet)) || Number(squareFeet) <= 0)
    ) {
      setErrorInfo("Invalid Square Feet: " + squareFeet);
      setFailSnackbar(true);
      return;
    }
    if (numBed.length != 0 && (isNaN(Number(numBed)) || Number(numBed) < 0)) {
      setErrorInfo("Invalid Bedroom Number: " + numBed);
      setFailSnackbar(true);
      return;
    }
    if (
      numOccupants.length != 0 &&
      (isNaN(Number(numOccupants)) || Number(numOccupants) < 0)
    ) {
      setErrorInfo("Invalid Occupant Number: " + numOccupants);
      setFailSnackbar(true);
      return;
    }
    const modifyData: ModifyLocationData = {
      locationID: Number(Props.modifyID),
      squareFeet: squareFeet.length > 0 ? Number(squareFeet) : null,
      numBed: numBed.length > 0 ? Number(numBed) : null,
      numOccupants: numOccupants.length > 0 ? Number(numOccupants) : null,
    };
    // alert(modifyData);

    // get token and email, email for finding userID
    const token = sessionStorage.getItem("token");
    if (token) {
      await modifyLocation(modifyData, token)
        .then((res) => {
          setSuccessSnackbar(true);
          window.location.href = "/location";
        })
        .catch((error) => {
          setFailSnackbar(true);
          setErrorInfo(error.data);
        });
    }
  };

  const handleDeleteLocation = async () => {
    const deleteID: number = Number(Props.modifyID);
    const token = sessionStorage.getItem("token");
    if (token) {
      await deleteLocation(deleteID, token)
        .then((res) => {
          window.location.href = "/location";
        })
        .catch((error) => {
          setFailSnackbar(true);
          setErrorInfo(error.data);
        });
    }
  };

  const handleClose = () => {
    Props.setOpenModifyCard(false);
  };

  return (
    <>
      <Dialog open={Props.openCard} onClose={handleClose}>
        <DialogTitle>Modify My Location # {Props.modifyIndex}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To modify location, please fill the value you want to change and
            click 'Save'. To delete location, click 'delete' and confirm.
            <br />
            *You can not change the address of the location.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid xs={4} padding={1}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="square_feet"
                  label="Square Feet"
                  variant="standard"
                  type="number"
                  onChange={(e) => {
                    setSquareFeet(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4} padding={1}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="num_beds"
                  label="Bedrooms"
                  variant="standard"
                  type="number"
                  onChange={(e) => {
                    setNumBed(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4} padding={1}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="num_occupants"
                  label="Occupants"
                  variant="standard"
                  type="number"
                  onChange={(e) => {
                    setNumOccupants(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4} padding={1}>
                <Button onClick={handleClose} variant="outlined" fullWidth>
                  Cancel
                </Button>
              </Grid>
              <Grid xs={4} padding={1}>
                <Button type="submit" variant="contained" fullWidth>
                  Save
                </Button>
              </Grid>
              <Grid xs={4} padding={1}>
                <Button
                  onClick={() => setOpenDelete(true)}
                  color="error"
                  variant="outlined"
                  fullWidth
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogContent sx={{ bgcolor: blueGrey[50], pt: 3 }}>
          <DialogContentText sx={{ color: blueGrey[700], textAlign: "center" }}>
            Are you sure you want to delete this location?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: blueGrey[50],
            justifyContent: "space-between",
            padding: "8px 24px",
          }}
        >
          <Button
            onClick={() => setOpenDelete(false)}
            sx={{ color: blueGrey[600], fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteLocation()}
            sx={{ color: blueGrey[800], fontWeight: "bold" }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={failSnackbar}
        autoHideDuration={50000}
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
    </>
  );
}

export default ModifyLocationCard;
