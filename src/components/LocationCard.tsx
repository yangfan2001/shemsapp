import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MapIcon from "@mui/icons-material/Map";
import { ListItem } from "@mui/material";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import ViewListIcon from "@mui/icons-material/ViewList";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BedIcon from "@mui/icons-material/Bed";
import GroupIcon from "@mui/icons-material/Group";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SettingsIcon from "@mui/icons-material/Settings";
import WebIcon from "@mui/icons-material/Web";
import { useNavigate } from "react-router-dom";

interface Props {
  locationID: number;
  locationIndex: number;
  streetNum: number;
  streetName: string;
  unitNum: string;
  city: string;
  state: string;
  zipCode: string;
  squareFeet: number;
  numBed: number;
  numOccupant: number;
  startDate: string;
  monthlyBill: number;
  monthlyEnergy: number;
  setModifyLocationIndex: (setIndex: number | null) => void;
  setOpenModifyCard: (open: boolean) => void;
  setModifyLocationID: (locationID: number | null) => void;
}

export default function LocationCard(Props: Props) {
  const [open, setOpen] = React.useState(false);

  const [openInfo, setOpenInfo] = React.useState(false);

  const navigate = useNavigate();

  const handleClickAddress = () => {
    setOpen(!open);
  };

  const handleClickInfo = () => {
    setOpenInfo(!openInfo);
  };

  const handleClickSetting = (index: number, id: number) => {
    Props.setModifyLocationIndex(index);
    Props.setOpenModifyCard(true);
    Props.setModifyLocationID(id);
  };

  const handleClickEnergy = () => {
    navigate("/energy/location", { state: { locationID: Props.locationID } });
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 430, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {"My location #" + Props.locationIndex}
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClickAddress}>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary={Props.streetNum + " " + Props.streetName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4, backgroundColor: "#FBFBFB" }}>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Full Address"}
              secondary={
                <div>
                  {Props.streetNum + " " + Props.streetName} <br />
                  {Props.unitNum}
                  <br />
                  {Props.city + ", " + Props.state + " " + Props.zipCode}
                </div>
              }
            />
          </ListItem>
        </List>
      </Collapse>

      {/* <ListItem sx={{ backgroundColor: "#FBFBFB" }}>
        <ListItemIcon>
          <OfflineBoltIcon />
        </ListItemIcon>
        <ListItemText
          primary="Monthly Bill"
          secondary={
            "$ " + Props.monthlyBill + " (" + Props.monthlyEnergy + " kwhs)"
          }
        />
      </ListItem> */}

      <ListItemButton onClick={handleClickInfo}>
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary={"More Info"} />
        {openInfo ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openInfo} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{ pl: 4, backgroundColor: "#FBFBFB" }}
        >
          <ListItem>
            <ListItemIcon>
              <SquareFootIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Square Feet"}
              secondary={Props.squareFeet}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BedIcon />
            </ListItemIcon>
            <ListItemText primary={"Bedrooms"} secondary={Props.numBed} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Occupants"} secondary={Props.numOccupant} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary={"Start Date"} secondary={Props.startDate} />
          </ListItem>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleClickEnergy()}>
        <ListItemIcon>
          <WebIcon />
        </ListItemIcon>
        <ListItemText primary="Check Energy Usage" />
      </ListItemButton>

      <ListItemButton
        onClick={() =>
          handleClickSetting(Props.locationIndex, Props.locationID)
        }
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Modify Location" />
      </ListItemButton>
    </List>
  );
}
