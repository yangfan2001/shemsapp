import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useSnackbar } from "../../components/SnackbarProvier";
import {
  getAllDevices,
  getAllDeviceModels,
  postAddDevice,
} from "../../services/device";
import { getCustomerLocation } from "../../services/location";
import {
  Container,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Switch,
  Box,
  FormControlLabel,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddDeviceModal from "./AddDeviceModel";
import DataTable from "../../components/dataTable";
import { blueGrey } from "@mui/material/colors";
import { deleteDevice } from "../../services/device";
import EditDeviceModel from "../../components/EditDeviceDialog";
import { getEnergyOfAllDevices } from "../../services/energy";
import { $TODAY } from "../../constants";
import DeviceEnergyChartDialog from "../../components/DeviceEnergyChartDialog";
import DeviceEventDialog from "../../components/DeviceEventDialog";

const genLocationName = (
  location_steet_num: Number,
  location_street_name: string,
  location_unit_number: string
) => {
  return (
    location_steet_num + " " + location_street_name + " " + location_unit_number
  );
};
export default function MyDevicePage() {
  const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [deviceModels, setDeviceModels] = useState([]);
  const [devices, setDevices] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDeleteDeviceId, setToDeleteDeviceId] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [toBeEditDevice, setToBeEditDevice] = useState({
    tag: "",
    id: "",
  } as any);
  const [energyDialogOpen, setEnergyDialogOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  const start = new Date($TODAY);
  start.setMonth(start.getMonth() - 1);
  const end = new Date($TODAY);

  const [isEnergyTable, setIsEnergyTable] = useState(false);
  const [energyTable, setEnergyTable] = useState([]);
  const [showEnergyDeviceId, setShowEnergyDeviceId] = useState("" as any);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAddDevice = async (
    location_id: string,
    model_id: string,
    tag: string
  ) => {
    await postAddDevice(location_id, model_id, tag)
      .then((response) => {
        showSnackbar("Device Added", "success");
        // refresh the page
        window.location.reload();
      })
      .catch((error) => {
        if (error.message) {
          showSnackbar(error.message, "error");
        } else {
          showSnackbar("Server Error", "error");
        }
      });
  };
  const handleDeleteButton = (deviceId: string) => {
    setToDeleteDeviceId(deviceId);
    setDeleteDialogOpen(true);
  };

  const handleDeviceDelete = async () => {
    setDeleteDialogOpen(false);
    console.log(toDeleteDeviceId);
    await deleteDevice(toDeleteDeviceId)
      .then((response) => {
        showSnackbar("Device Deleted", "success");
        // refresh the page
        window.location.reload();
      })
      .catch((error) => {
        if (error.message) {
          showSnackbar(error.message, "error");
        } else {
          showSnackbar("Server Error", "error");
        }
      });
  };

  const handleEditButtonClick = (device: any) => {
    setToBeEditDevice({
      tag: device.tag,
      id: device.id,
    });
    setEditDialogOpen(true);
  };

  const tableColumns = [
    { field: "id", headerName: "device_id", width: 80 },
    { field: "model_type", headerName: "Model Type", width: 150 },
    { field: "model_name", headerName: "Model Name", width: 300 },
    { field: "tag", headerName: "Tag", width: 150 },
    { field: "location", headerName: "Location", width: 250 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => (
        <strong>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => handleEditButtonClick(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => handleDeleteButton(params.row.id)}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  const energyTableColumns = [
    { field: "id", headerName: "device_id", width: 80 },
    { field: "model_type", headerName: "Model Type", width: 150 },
    { field: "model_name", headerName: "Model Name", width: 250 },
    { field: "address", headerName: "Location", width: 250 },
    { field: "energy", headerName: "Last Month's Comsuption", width: 150 },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params: any) => (
        <strong>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => {
              setEnergyDialogOpen(true);
              setShowEnergyDeviceId(params.row.id);
            }}
          >
            Show Energy
          </Button>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            style={{ marginLeft: 16 }}
            onClick={() => {
              setEventDialogOpen(true);
              setShowEnergyDeviceId(params.row.id);
            }}
          >
            View Activities
          </Button>
        </strong>
      ),
    },
  ];

  useEffect(() => {
    // declare a function fetchData that is async and calls getAllDevices
    const fetchData = async () => {
      try {
        const [
          deviceResponse,
          deviceModelResponse,
          locationResponse,
          energyResponse,
        ] = await Promise.all([
          getAllDevices(),
          getAllDeviceModels(),
          getCustomerLocation(),
          getEnergyOfAllDevices(start, end),
        ]);
        setDeviceModels(deviceModelResponse.data);
        setLocations(locationResponse.data);
        const tmp = deviceResponse.data
          .filter((device: any) => device.in_use !== 0)
          .map((device: any) => {
            return {
              id: device.device_id,
              model_type: device.model_type,
              model_name: device.model_name,
              tag: device.tag,
              location: genLocationName(
                device.location_street_num,
                device.location_street_name,
                device.location_unit_number
              ),
            };
          });
        setDevices(tmp);
        const tmp2 = energyResponse.data.map((device: any) => {
          return {
            id: device.device_id,
            model_type: device.model_type,
            model_name: device.model_name,
            address: device.address,
            energy: device.average_energy_consumption,
          };
        });
        setEnergyTable(tmp2);
      } catch (error: any) {
        if (error.message) {
          showSnackbar(error.message, "error");
        } else {
          showSnackbar("Server Error", "error");
        }
      } finally {
        setIsLoading(false);
      }
    };
    // call fetchData
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ margin: "24px 0", padding: "16x" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ marginBottom: "0px" }}
          onClick={handleOpenModal}
        >
          Add Device
        </Button>

        <FormControlLabel
          control={
            <Switch
              checked={isEnergyTable}
              onChange={() => setIsEnergyTable(!isEnergyTable)}
            />
          }
          label="Energy Table"
        />
      </Box>

      {isEnergyTable ? (
        <DataTable columns={energyTableColumns} rows={energyTable} />
      ) : (
        <DataTable columns={tableColumns} rows={devices} />
      )}

      <AddDeviceModal
        open={openModal}
        handleClose={handleCloseModal}
        handleAddDevice={handleAddDevice}
        locations={locations}
        Models={deviceModels}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogContent sx={{ bgcolor: blueGrey[50], pt: 3 }}>
          <DialogContentText sx={{ color: blueGrey[700], textAlign: "center" }}>
            Are you sure you want delete this device? This action cannot be
            undone.
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
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: blueGrey[600], fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeviceDelete}
            sx={{ color: blueGrey[800], fontWeight: "bold" }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <EditDeviceModel
        modelOpen={editDialogOpen}
        setModelOpen={setEditDialogOpen}
        device={toBeEditDevice}
      />

      <DeviceEnergyChartDialog
        modelOpen={energyDialogOpen}
        setModelOpen={setEnergyDialogOpen}
        deviceId={showEnergyDeviceId}
      />

      <DeviceEventDialog
        modelOpen={eventDialogOpen}
        setModelOpen={setEventDialogOpen}
        deviceId={showEnergyDeviceId}
      />
    </Container>
  );
}
