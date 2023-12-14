import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useSnackbar } from "../../components/SnackbarProvier";
import { getAllDevices,getAllDeviceModels, postAddDevice } from "../../services/device";
import { getCustomerLocation } from "../../services/location";
import { Container, Paper, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddDeviceModal from "./AddDeviceModel";
import DataTable from "../../components/dataTable";


const tableColumns = [
  { field: 'id', headerName: 'device_id', width: 120 },
  { field: 'model_type', headerName: 'Model Type', width: 150 },
  { field: 'model_name', headerName: 'Model Name', width: 300 },
  { field: 'tag', headerName: 'Tag', width: 200 },
  { field: 'location', headerName: 'Location', width: 400 },
]
const genLocationName = (location_steet_num: Number, location_street_name: string, location_unit_number:string) => {
  return location_steet_num + " " + location_street_name + " " + location_unit_number;
}
export default function MyDevicePage() {
  const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [deviceModels, setDeviceModels] = useState([]);
  const [devices, setDevices] = useState([]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAddDevice = async (location_id:string, model_id:string, tag:string) => {
    await postAddDevice(location_id, model_id, tag).then((response) => {
      showSnackbar('Device Added', 'success')
      // refresh the page
      window.location.reload();
    }).catch((error) => {
      if (error.message) {
        showSnackbar(error.message, 'error')
      } else {
        showSnackbar('Server Error', 'error')
      }
    });

  }
  useEffect(() => {
    // declare a function fetchData that is async and calls getAllDevices
    const fetchData = async () => {
      try {
        const [deviceResponse,deviceModelResponse,locationResponse] = await Promise.all([
          getAllDevices(),
          getAllDeviceModels(),
          getCustomerLocation()
      ]);
      setDeviceModels(deviceModelResponse.data);
      setLocations(locationResponse.data);
      const tmp = deviceResponse.data.map((device:any) => {
        return {
          id: device.device_id,
          model_type: device.model_type,
          model_name: device.model_name,
          tag: device.tag,
          location: genLocationName(device.location_street_num, device.location_street_name, device.location_unit_number)
        }
      })
      setDevices(tmp);
      console.log(tmp);
      } catch (error: any) {
        if (error.message) {
          showSnackbar(error.message, 'error')
        } else {
          showSnackbar('Server Error', 'error')
        }
      } finally{
        setIsLoading(false)
      }
    }
    // call fetchData
    fetchData()
  }, [])
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <Container maxWidth="lg">
      <Paper sx={{ margin: '24px 0', padding: '16px' }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ marginBottom: '0px' }}
          onClick={handleOpenModal}
        >
          Add Device
        </Button>
        <DataTable rows={devices} columns={tableColumns} showSearch={false}/>
      </Paper>
      <AddDeviceModal open={openModal} handleClose={handleCloseModal}  handleAddDevice={handleAddDevice}
      locations={locations} Models={deviceModels}/>
    </Container>
  );
}