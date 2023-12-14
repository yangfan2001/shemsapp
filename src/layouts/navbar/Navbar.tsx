import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Drawer, List, ListItem, ListItemText, Divider} from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { blueGrey } from "@mui/material/colors";
import { useSnackbar } from "../../components/SnackbarProvier";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const firstName = sessionStorage.getItem("email");
  const [openDialog, setOpenDialog] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open:any) => (event:any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    navigate("/");
    setOpenDialog(false);
  };

  const handleMenuItemClick = (path:string) => {
    // pre check if login
    if (sessionStorage.getItem("token") === null) {
      showSnackbar("Please login first", "error");
      return;
    }
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Smart Home Energy Management System
          </Typography>
          {firstName ? (
            <Button color="inherit" onClick={() => setOpenDialog(true)}>
              Log Out {firstName}
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent sx={{ bgcolor: blueGrey[50], pt: 3 }}>
          <DialogContentText sx={{ color: blueGrey[700], textAlign: "center" }}>
            Are you sure you want to log out?
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
            onClick={() => setOpenDialog(false)}
            sx={{ color: blueGrey[600], fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            sx={{ color: blueGrey[800], fontWeight: "bold" }}
            autoFocus
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer
  anchor="left"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
>
  <Box
    sx={{ width: 250 }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <Typography variant="h6" sx={{ padding: 2 }}>
      Menu
    </Typography>
    <Divider />
    <List>
    <ListItem onClick={() => handleMenuItemClick('/account')}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
      <ListItem onClick={() => handleMenuItemClick('/device')}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Device" />
      </ListItem>
      <ListItem  onClick={() => handleMenuItemClick('/location')}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Location" />
      </ListItem>
      {/* Add more ListItems with icons here for additional pages */}
    </List>
  </Box>
</Drawer>


    </Box>
  );
}
